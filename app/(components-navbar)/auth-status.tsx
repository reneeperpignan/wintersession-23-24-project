"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useAuthContext } from "../(context)/auth-context";
import UserNav from "./user-nav";

export default function AuthStatus() {
  const { user, profile } = useAuthContext();

  const handleSignIn = () => {
    void signInWithGoogle();
  };

  if (user === "loading") {
    return <p>Loading user...</p>;
  }

  if (!user) {
    return <Button onClick={handleSignIn}>Log in</Button>;
  }

  if (profile === "loading") {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return <UserNav user={user} profile={profile} />;
}
