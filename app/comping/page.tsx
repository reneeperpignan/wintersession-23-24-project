import { TypographyH2 } from "@/components/ui/typography";
import { type Orgs } from "@/lib/firebase/schema";
import OrgDetailDialog from "../org-catalog/org-detail-dialog";
import { db } from "@/lib/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";


const TEST_ID = "4gt81i16mse1kZgCVxmv";
const docRef = doc(db, "orgs", TEST_ID);
const docSnap = await getDoc(docRef);
const TEST_ORG: Orgs = { ...docSnap.data(), id: TEST_ID } as Orgs;

export default function Comping() {
  return (
    <div>
      <TypographyH2>Comping</TypographyH2>
      <OrgDetailDialog
        id="4gt81i16mse1kZgCVxmv"
        org={TEST_ORG}
        cardEditsVisible={true}
      />
    </div>
  );
}
