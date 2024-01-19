"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypographyP } from "@/components/ui/typography";
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
        <DialogHeader>
          <DialogTitle>{org.name}</DialogTitle>
          <DialogDescription>
            <TypographyP>
              <b>Description:</b> {org.description}
            </TypographyP>
            <TypographyP>
              <b>Directors:</b> {org.directors.reduce((a: string, b: string) => a + ", " + b)}
            </TypographyP>
            <TypographyP>
              <b>Members:</b> {org.members.length > 0 ? org.members.reduce((a: string, b: string) => a + ", " + b) : ""}
            </TypographyP>
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
            {cardEditsVisible && (
              <Button id="editButton" variant="outline" onClick={handleEdit}>
                Edit
              </Button>
            )}
            {cardEditsVisible && (
              <Button
                id="deleteButton"
                variant="outline"
                onClick={(e: SyntheticEvent) => {
                  void (async () => {
                    await handleDelete(id, e);
                  })();
                }}
              >
                Delete
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      {isEditing && <EditOrgDialog id={id} org={org} onClose={() => setIsEditing(false)} />}
    </Dialog>
  );
}
