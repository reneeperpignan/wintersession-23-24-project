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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  const MemberCount: number = organization.members.length;
  console.log("props from orgcard:", orgid, userid, organization);

  return (
    <Card style={{ width: "300px" }}>
      <img
        className="rounded-t-lg"
        src="/harvard-pic.jpg"
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
