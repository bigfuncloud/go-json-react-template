import React from "react";
import { useQuery } from "react-query";

import FriendList from "../friends/friend_list";
import FriendForm from "../friends/friend_form";

import "./app.css";

export default function App() {
  const { isLoading, error, data } = useQuery("ping", () =>
    fetch("/api/ping").then((res) => res.text())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1 className="blue">gin + react</h1>
      <p>Got a pong from API: {data}</p>
      <FriendList />
      <FriendForm />
    </>
  );
}
