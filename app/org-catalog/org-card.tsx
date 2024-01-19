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
import { Toggle } from "@/components/ui/toggle";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import OrgDetailDialog from "./org-detail-dialog";

// Card for catalog and favorited page
interface OrgCardProps {
  organization: Orgs;
  userid: string;
  orgid: string;
}

export default function OrgCardCatalog({ orgid, userid, organization }: OrgCardProps) {
  // Calculate the number of members
  const MemberCount: number = organization.members.length;

  console.log("userid from orgcard.tsx: ", userid);

  const handleComp = async () => {
    // e.preventDefault();

    const docRef = doc(db, "orgs", orgid);

    //user.uid is nothing...??

    await updateDoc(docRef, {
      comping: arrayUnion(userid),
    });

    alert("added to comping");

    // toast({
    //   title: "Success!",
    //   description: `You joined ${organization.name}`,
    // });
  };

  return (
    <Card>
      <CardHeader>
        <Toggle>&#9734;</Toggle>
        <CardDescription>{`${MemberCount} Members`}</CardDescription>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {organization.description.slice(0, 150).trim() + "..."}
        <div>
          {organization.timeupper > 0 && (
            <Badge variant="outline">
              {organization.timelower}-{organization.timeupper}hrs
            </Badge>
          )}
          <Badge variant="outline">{organization.comptype}</Badge>
          <Badge variant="outline">{organization.type}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <OrgDetailDialog id={orgid} org={organization} cardEditsVisible={true} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outline">
              beginComp
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

// const clubTypes = ["Academic", "Sports", "Music", "Arts", "Professional", "Affinity", "Other"];
// const compTypes = ["Mail sign-up", "Completion comp", "Competitive comp"];
// const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Fridays", "Saturday", "Sunday"];

// function Form({ onSubmit }: FormProps) {
//   const [formData, setFormData] = React.useState<FormData>({
//     name: '',
//     description: '',
//     mailingList: '',
//     clubType: '',
//     website: '',
//     logo: undefined,
//     compType: '',
//     meetingDay: '',
//     meetingTime: '12:00',
//     timeLower: 0,
//     timeUpper: 0
//   });
