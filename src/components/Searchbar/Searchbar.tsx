import "./Searchbar.css";

interface SearchbarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Searchbar({ value, onChange }: SearchbarProps) {
  return (
    <div className="searchbar">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for a user"
      />
    </div>
  );
}

export default Searchbar;
