import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import postData from "../postData";
import { Friend } from "./friend_list";

export default function FriendForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newFriend: Friend) => postData("/api/friends", { value: newFriend }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("friends");
      },
    }
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      {mutation.isLoading ? (
        "Adding friend..."
      ) : (
        <>
          {mutation.isError ? <div>An error occurred :(</div> : null}

          {mutation.isSuccess ? <div>Friend added!</div> : null}

          <div>
            <label htmlFor="name">Name:</label>{" "}
            <input id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>{" "}
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              mutation.mutate({ Name: name, Email: email });
            }}
          >
            Befriend
          </button>
        </>
      )}
    </div>
  );
}
