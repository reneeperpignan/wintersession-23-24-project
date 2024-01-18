import { TypographyH2 } from "@/components/ui/typography";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { doc, getDoc } from "firebase/firestore";
import OrgDetailDialog from "../org-catalog/org-detail-dialog";

const TEST_ID = "4gt81i16mse1kZgCVxmv";
const docRef = doc(db, "orgs", TEST_ID);
const docSnap = await getDoc(docRef);
const TEST_ORG: Orgs = { ...docSnap.data(), id: TEST_ID } as Orgs;

export default function Comping() {
  return (
    <div>
      <TypographyH2>Comping</TypographyH2>
      <OrgDetailDialog
        org={{
          id: "org_1",
          name: "Tech for Social Good",
          description:
            "Harvard Tech for Social Good (T4SG) leverages Harvard talent to partner with nonprofits, \
                        government agencies, and social impact organizations to amplify their impact through technology. \
                        Students can develop their expertise in software engineering, user experience, and ethics through \
                        semester-long projects with real-world clients.",
          members: ["profile_1", "profile_2", "profile_3", "profile_4", "profile_5"],
          directors: ["profile_1", "profile_4"],
          mailinglist: "https://socialgood.hcs.harvard.edu/",
          type: "Technology",
          comptype: "Competitive",
          meetingtime: "Mondays 6-8 PM",
          timecommitment: "7-10 hours per week",
        }}
        cardEditsVisible={false}
      />
    </div>
  );
}
