import "./Card.css";
import type { User } from "../../types/types";

interface CardProps {
  user: User;
  selected: boolean;
  toggleSelect: (user: User) => void;
}

function Card({ user, selected, toggleSelect }: CardProps) {
  return (
    <div className="card">
      <label className="cb_container">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelect(user)}
          className="card__checkbox"
        />
        <span className="checkmark"></span>
      </label>

      <div className="card__avatar">
        <img src={user.avatar_url} alt={`Avatar de ${user.login}`} />
      </div>
      <div className="card__infos">
        <div className="card__id">{user.id}</div>
        <div className="card__login">{user.login}</div>
      </div>
      <a href={user.html_url} target="_blank" className="card__button">
        View profile
      </a>
    </div>
  );
}

export default Card;
