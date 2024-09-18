"use client"

import { useUser } from "@clerk/nextjs"

export default function User() {
    const { user } = useUser();

    if(!user)
        return "/sad/sasd/gdfg";

    return user.imageUrl
}