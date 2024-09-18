"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function InputPost() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col "
      >
        <input
          type="text"
          placeholder="Type some post..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-none bg-transparent focus:border-none outline-none w-full px-4 py-4"
        />
      </form>
    </div>
  );
}
