"server-only"

import { clerkClient } from "@clerk/nextjs/server";

export async function fetchAllUsers() {
  const users = await clerkClient().users.getUserList();
  return users.data.map(user => user.id);
}