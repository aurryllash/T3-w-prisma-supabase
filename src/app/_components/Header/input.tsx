"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function InputPost({ author_id }: { author_id: string }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      setName("");
      router.refresh();
    }, 
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost.mutate({ name, author_id });
  };

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Type some post..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-none bg-transparent px-4 py-4 outline-none focus:border-none"
        />
      </form>
    </div>
  );
}

