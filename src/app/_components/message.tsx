"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function Messages() {
  const [text, setText] = useState<string>("");
  const addMessage = api.message.addMessage.useMutation({
    onSuccess: async () => {
      setText("")
    }
  });

  return (
    <div className="">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(text);
            addMessage.mutate({ text })
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="Title"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
          />
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
            //   disabled={createPost.isPending}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
