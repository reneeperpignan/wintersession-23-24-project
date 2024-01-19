import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import OrgDetailDialog from "./org-detail-dialog";

// Card for catalog and favorited page
interface OrgCardProps {
  organization: Orgs;
  uid: string;
  orgid: string;
}

export default function OrgCardCatalog({ orgid, uid, organization }: OrgCardProps) {
  // Calculate the number of members
  const MemberCount: number = organization.members.length;
  // const [disabled] = useState(organization.members.includes(uid) ? true : false);

  console.log("userid from orgcard.tsx: ", uid);

  const handleComp = async () => {
    // e.preventDefault();

    const docRef = doc(db, "orgs", orgid);

    //user.uid is nothing...??

    await updateDoc(docRef, {
      comping: arrayUnion(uid),
    });

    alert("added to comping");

    // toast({
    //   title: "Success!",
    //   description: `You joined ${organization.name}`,
    // });
  };

  // Can make a flex box to create boundaries of card
  return (
    <Card style={{ width: "300px" }}>
      <img
        className="rounded-t-lg"
        src={organization.logo}
        style={{ height: "auto" }}
        alt="logo"
        width="300"
        height={0}
      />
      <CardHeader style={{ display: "flex" }}>
        <CardDescription>{`${MemberCount} Members`}</CardDescription>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {organization.description.slice(0, 70).trim() + "..."}
        <div className="space-x-1 pt-1">
          {organization.timeupper > 0 && (
            <Badge variant="outline">
              {organization.timelower}-{organization.timeupper} hrs
            </Badge>
          )}
          <Badge variant="outline">{organization.comptype}</Badge>
          <Badge variant="outline">{organization.type}</Badge>
        </div>
      </CardContent>
      <CardFooter className=" flex justify-center space-x-4">
        {/* <br></br> */}
        <OrgDetailDialog id={orgid} org={organization} cardEditsVisible={true} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              // disabled={disabled}
            >
              Begin Comp
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>You really want to comp?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => void handleComp()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
