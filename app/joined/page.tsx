import { TypographyH2 } from "@/components/ui/typography";
import OrgDetailDialog from "../org-catalog/org-detail-dialog";


export default function Joined() {
  return (
    <div>
      <TypographyH2>Joined</TypographyH2>
      <OrgDetailDialog
        org={{
          id: 'org_1',
          name: 'Tech for Social Good',
          description:
            "Harvard Tech for Social Good (T4SG) leverages Harvard talent to \
             partner with nonprofits, government agencies, and social impact \
             organizations to amplify their impact through technology. Students \
             can develop their expertise in software engineering, user experience, \
             and ethics through semester-long projects with real-world clients.",
          members: ['profile_1', 'profile_2', 'profile_3', 'profile_4', 'profile_5'],
          directors: ['profile_1', 'profile_4'],
          mailinglist: 'https://socialgood.hcs.harvard.edu/',
          type: 'Technology',
          comptype: 'Competitive',
          meetingtime: 'Mondays 6-8 PM',
          timelower: 7,
          timeupper: 10,
          meetingday: "Tuesday",
          logo: "string",
          website: "www.google.com"
        }}
        cardEditsVisible={false}
      />
    </div>
  );
}