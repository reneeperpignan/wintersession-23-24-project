"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import RenderComp from "./render-comp";

export default function Comping() {
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
      <TypographyH2 className="text-Crimson">Comping</TypographyH2>
      <br></br>
      <RenderComp
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
