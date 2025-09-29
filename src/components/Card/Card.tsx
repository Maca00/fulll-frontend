import "./Card.css";
import type { UserItem } from "../../types/types";

interface CardProps {
  user: UserItem;
}

function Card({ user }: CardProps) {
  return (
    <div className="card">
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
