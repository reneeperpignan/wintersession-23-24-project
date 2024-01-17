"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import OrgCardHomePage from "./org-card";
import OrgCardComp from "./org-card-comp";
import OrgCardCurrent from "./org-card-current";
import Image from "next/image";

export default function OrgCatalog() {
  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <>
      <TypographyH2>Dashboard I edited this from renee</TypographyH2>
      Home Page and Favorited List<OrgCardHomePage/>
      Comp <OrgCardComp/>
      Current <OrgCardCurrent/>
      {/* <Image 
        src="/harvard-pic.jpg"
        width={500}
        height={500}
      /> */}
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {user.email && <TypographyP>{`Your email is ${user.email}`}</TypographyP>}
    </>
  );
}
