import { useEffect, useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Results from "../Results/Results";
import { useDebounce } from "../../hooks/useDebounce";
import type { SearchResponse, ApiError, User } from "../../types/types";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Search.css";

function Search() {
  const [searchVal, setSearchVal] = useState<string>("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);

  const debouncedValue = useDebounce(searchVal, 800);

  useEffect(() => {
    const fetchUsers = async () => {
      if (
        rateLimitReset !== null &&
        rateLimitReset > Math.floor(Date.now() / 1000)
      ) {
        return; // Ne rien faire si le temps du rate limit n'est pas expiré
      }

      if (!debouncedValue) {
        setUsers(null);
        return;
      }

      setError(null);
      setIsLoading(true);

      try {
        const response: Response = await fetch(
          `https://api.github.com/search/users?q=${debouncedValue}`
        );

        const remaining: number = Number(
          response.headers.get("X-RateLimit-Remaining") ?? 0
        );

        if (remaining === 0) {
          const reset = response.headers.get("X-RateLimit-Reset");
          const resetDate = reset ? new Date(Number(reset) * 1000) : null;

          setRateLimitReset(reset ? Number(reset) : null);

          throw new Error(
            `Rate limit reached. Try again ${
              resetDate ? `after ${resetDate.toLocaleTimeString()}` : "later"
            }.`
          );
        }

        if (!response.ok) {
          let apiMessage = "";
          try {
            const errorData: ApiError = await response.json();
            apiMessage = errorData?.message ? ` - ${errorData.message}` : "";
          } catch {
            apiMessage = " - Unknown error";
          }
          throw new Error(`API Error : ${response.status}${apiMessage}`);
        }

        const data: SearchResponse = await response.json();
        setUsers(data.items);
      } catch (err) {
        const error = err as Error;
        setError(error.message || "Unknown error");
        setUsers(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  return (
    <>
      <Searchbar value={searchVal} onChange={handleChange} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <>
          <Results users={users} setUsers={setUsers} />
        </>
      )}
    </>
  );
}

export default Search;
