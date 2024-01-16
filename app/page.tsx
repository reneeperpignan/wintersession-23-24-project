"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import OrgDetailDialog from "./org-catalog/org-detail-dialog";

export default function Home() {
  return (
    <>
      <TypographyH2>Welcome to the T4SG starter project!</TypographyH2>
      <TypographyP>
        This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Feel free to add
        your own components!
      </TypographyP>
      <TypographyP>
        This page is an unprotected route accessible to anyone who visits the website. Log in to view authenticated
        routes!
      </TypographyP>
      <OrgDetailDialog
        id="org_1"
        name="Tech for Social Good"
        description="Harvard Tech for Social Good (T4SG) leverages Harvard talent to partner with nonprofits,
                     government agencies, and social impact organizations to amplify their impact through technology.
                     Students can develop their expertise in software engineering, user experience, and ethics through
                     semester-long projects with real-world clients."
        members={["profile_1", "profile_2", "profile_3", "profile_4", "profile_5"]}
        directors={["profile_1", "profile_4"]}
        mailinglist="https://socialgood.hcs.harvard.edu/"
        type="Technology"
        comptype="Competitive"
        meetingtime="Mondays 6-8 PM"
        timecommitment="7-10 hours per week"
      />
    </>
  );
}
