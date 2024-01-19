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
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import OrgDetailDialog from "./org-detail-dialog";

interface OrgCardProps {
  organization: Orgs;
  userid: string;
  orgid: string;
}

export default function OrgCardComp({ orgid, userid, organization }: OrgCardProps) {
  const handleFinish = async () => {
    // e.preventDefault();

    const docRef = doc(db, "orgs", orgid);

    //user.uid is nothing...??

    await updateDoc(docRef, {
      comping: arrayRemove(userid),
    });

    await updateDoc(docRef, {
      members: arrayUnion(userid),
    });

    alert("removed from comping, added to union");

    // toast({
    //   title: "Success!",
    //   description: `You joined ${organization.name}`,
    // });
  };

  // Calculate the number of members
  const MemberCount = organization.members.length;
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
        <div className="space-x-1">
          {organization.timeupper > 0 && (
            <Badge variant="outline">
              {organization.timelower}-{organization.timeupper} hrs
            </Badge>
          )}
          <Badge variant="outline">{organization.comptype}</Badge>
          <Badge variant="outline">{organization.type}</Badge>
        </div>
        <div className="flex items-stretch justify-between py-2">
          <div>Comp Progress</div>
          <div>0%</div>
        </div>
        <Progress value={0} />
      </CardContent>
      <CardFooter className=" flex justify-center space-x-4">
        <OrgDetailDialog id={orgid} org={organization} cardEditsVisible={false} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outline">
              Finish comp
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>You are finished comping?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => void handleFinish()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
