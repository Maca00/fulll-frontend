import Card from "../Card/Card";
import "./Results.css";
import type { User } from "../../types/types";
import React, { useEffect, useRef, useState } from "react";
import EmptyState from "../EmptyState/EmptyState";

interface ResultsProps {
  users: User[] | null;
  setUsers: (users: User[]) => void;
}
function Results({ users, setUsers }: ResultsProps) {
  const [selected, setSelected] = useState<User[]>([]);
  const mainCheckboxRef = useRef<HTMLInputElement>(null);

  const toggleSelect = (user: User) => {
    setSelected((prev) =>
      prev.includes(user)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected([...users]);
    }
  };

  // Gérer l'état "indeterminate"
  useEffect(() => {
    if (mainCheckboxRef.current) {
      mainCheckboxRef.current.indeterminate =
        selected.length > 0 && selected.length < users.length;
    }
  }, [selected, users]);

  const duplicateSelected = () => {
    const newUsers = [...users];
    [...selected].reverse().forEach((user) => {
      const copy = { ...user, id: Date.now() + Math.random() }; // nouvel ID unique

      newUsers.unshift(copy);
    });
    setUsers(newUsers);
    setSelected([]);
  };

  const deleteSelected = () => {
    setUsers(users.filter((user) => !selected.some((u) => u.id === user.id)));
    setSelected([]);
  };

  if (users && users !== null && users.length === 0)
    return <EmptyState message="Your search did not match any user" />;

  if (users === null) // si pas encore de recherche, on ne retourne rien
    return;

  return (
    <>
      <div className="listHeader">
        <div className="listHeader__left">
          <label className="cb_container">
            <input
              type="checkbox"
              className="listHeader__checkbox"
              ref={mainCheckboxRef}
              checked={selected.length === users.length}
              onChange={toggleSelectAll}
            />
            <span className="checkmark"></span>
          </label>

          <div className="listHeader__counter">
            {selected.length} item{selected.length > 1 ? "s" : ""} selected
          </div>
        </div>
        <div className="listHeader__right">
          <button onClick={duplicateSelected} disabled={selected.length === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
          </button>
          <button onClick={deleteSelected} disabled={selected.length === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="results">
        <div className="results-content">
          {users.map((user: User) => (
            <Card
              key={user.id}
              user={user}
              selected={selected.includes(user)}
              toggleSelect={toggleSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default React.memo(Results);
