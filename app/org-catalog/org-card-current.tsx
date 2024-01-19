import {
  AlertDialog,
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import OrgDetailDialog from "./org-detail-dialog";

interface OrgCardProps {
  organization: Orgs;
  userid: string;
  orgid: string;
}

export default function OrgCardCurrent({ orgid, userid, organization }: OrgCardProps) {
  const handleLeave = async () => {
    const docRef = doc(db, "orgs", organization.id);
    console.log("arrayRemove userid is ", userid);

    await updateDoc(docRef, {
      members: arrayRemove(userid),
    });

    alert("Left");
    // toast({
    //   title: "Success!",
    //   description: `You left ${organization.name}`,
    // });
  };

  // Calculate the number of members
  // const MemberCount : number = organization.members.count;
  console.log("props from orgcard:", orgid, userid, organization);

  return (
    <Card>
      <CardHeader>
        <Toggle>&#9734;</Toggle>
        {/* <CardDescription>{`${MemberCount} Members`}</CardDescription> */}
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
        <OrgDetailDialog id={organization.id} org={organization} cardEditsVisible={false} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive">
              Leave
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>You really want to leave?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => void handleLeave()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
