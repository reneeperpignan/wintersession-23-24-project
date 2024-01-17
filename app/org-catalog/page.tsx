"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import OrgDetailDialog from "./org-detail-dialog";

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
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {user.email && <TypographyP>{`Your email is ${user.email}`}</TypographyP>}
      <OrgDetailDialog
        org={{
          id: "org_1",
          name: "Tech for Social Good",
          description:
            "Harvard Tech for Social Good (T4SG) leverages Harvard talent to \
                        partner with nonprofits, government agencies, and social impact \
                        organizations to amplify their impact through technology. Students \
                        can develop their expertise in software engineering, user experience, \
                        and ethics through semester-long projects with real-world clients.",
          members: ["profile_1", "profile_2", "profile_3", "profile_4", "profile_5"],
          directors: ["profile_1", "profile_4"],
          mailinglist: "https://socialgood.hcs.harvard.edu/",
          type: "Technology",
          comptype: "Competitive",
          meetingtime: "Mondays 6-8 PM",
          timeupper: 7,
          timelower: 10,
          meetingday: "Tuesday",
          logo: "string",
          website: "www.google.com",
        }}
        cardEditsVisible={true}
      />
    </>
  );
}
