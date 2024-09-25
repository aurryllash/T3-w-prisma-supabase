import { type User } from "@clerk/nextjs/server";
import profileImage from "public/images/profile_image/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl || profileImage,
    fullName: user.fullName,
  };
};