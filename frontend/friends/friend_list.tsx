import React from "react";
import { useQuery } from "react-query";

export interface Friend {
  // There are more properties returned by Gin, too.
  ID?: number;
  Email: string;
  Name: string;
}

export default function FriendList() {
  const { isLoading, error, data } = useQuery<{ value: Friend[] }>(
    "friends",
    () => fetch("/api/friends").then((res) => res.json())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.value.map((friend) => (
        <li key={friend.ID}>
          {friend.Name}: {friend.Email}
        </li>
      ))}
    </ul>
  );
}
