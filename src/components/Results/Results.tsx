import Card from "../Card/Card";
import "./Results.css";
import type { User } from "../../types/types";
import React from "react";
import EmptyState from "../EmptyState/EmptySTate";

interface ResultsProps {
  users: User[];
}
function Results({ users }: ResultsProps) {
  if (!users) return <EmptyState message="Your search did not match any user" />;

  return (
    <div className="results">
      <div className="results-content">
        {users.map((user: User) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default React.memo(Results);
