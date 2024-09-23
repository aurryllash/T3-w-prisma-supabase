"use client"

import { useUser } from "@clerk/nextjs"

export default function User() {
    const { user } = useUser();

    if(!user)
        return null;

    return user
}