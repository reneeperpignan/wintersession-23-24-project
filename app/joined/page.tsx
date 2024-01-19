"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import RenderJoined from "./render-joined";

export default function Joined() {
  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <div>
      <TypographyH2 className="text-Crimson">Joined</TypographyH2>
      <RenderJoined
        uid={user.uid}
        displayName={user.displayName}
        email={user.email} //all things we don't need rn
        phoneNumber={null}
        photoURL={null}
        providerId=""
      />
    </div>
  );
}
