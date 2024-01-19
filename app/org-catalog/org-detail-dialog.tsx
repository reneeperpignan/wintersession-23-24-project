"use client";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypographyP } from "@/components/ui/typography";
import Image from "next/image";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import EditOrgDialog from "./edit-org-dialog";

interface OrgDetailDialogProps {
  id: string;
  org: Orgs;
  cardEditsVisible: boolean;
}

export default function OrgDetailDialog({ id, org, cardEditsVisible }: OrgDetailDialogProps) {
  const router = useRouter();
  const handleDelete = async (id: string, e: SyntheticEvent) => {
    e.preventDefault();
    const decRef = doc(db, "orgs", id);
    await deleteDoc(decRef);
    alert("The club is being deleted - may take a few moments to update.");
    router.refresh();
    alert("The club has been deleted.");
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Learn More</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex">
          <DialogTitle className="text-BrightRed text-4xl">{org.name}</DialogTitle>
          {org.logo && <Image src={org.logo} alt={org.name + " logo"}></Image>}
        </div>
        <DialogDescription className="text-Gray">
          <TypographyP>
            <b>Description:</b> {org.description}
          </TypographyP>
          {/* <TypographyP>
            <b>Directors:</b> {org.directors.reduce((a: string, b: string) => a + ", " + b)}
          </TypographyP> */}
          {org.members.length > 0 && (
            <TypographyP>
              <b>Members:</b>{" "}
              {org.members.length > 0 ? org.members.reduce((a: string, b: string) => a + ", " + b) : ""}
            </TypographyP>
          )}
          <TypographyP>
            <b>Mailing List:</b> <a href={org.mailinglist}>{org.mailinglist}</a>
          </TypographyP>
          <TypographyP>
            <b>Type:</b> {org.type}
          </TypographyP>
          <TypographyP>
            <b>Comp Type:</b> {org.comptype}
          </TypographyP>
          <TypographyP>
            <b>Meeting Time:</b> {org.meetingtime}
          </TypographyP>
          <TypographyP>
            <b>Time Commitment:</b> {org.timelower}-{org.timeupper} hours per week
          </TypographyP>
          <TypographyP>
            <b>Website:</b> <a href={org.website}>{org.website}</a>
          </TypographyP>
          {cardEditsVisible && (
            <Button id="editButton" variant="outline" onClick={handleEdit}>
              Edit
            </Button>
          )}
          {cardEditsVisible && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="bg-BrightRed">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>Do you really want to delete this club?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e: SyntheticEvent) => {
                      void (async () => {
                        await handleDelete(id, e);
                      })();
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DialogDescription>
      </DialogContent>
      {isEditing && <EditOrgDialog id={id} org={org} onClose={() => setIsEditing(false)} />}
    </Dialog>
  );
}
