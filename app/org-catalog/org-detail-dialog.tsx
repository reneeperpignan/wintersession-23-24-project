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
      <DialogContent className="max-w-[800px]">
        <div className="flex items-center justify-between gap-4">
          <DialogTitle className="text-BrightRed text-2xl">{org.name}</DialogTitle>
          <Image
            className=""
            src="/harvard-pic.jpg"
            style={{ height: "auto", marginRight: "10px" }}
            alt="logo"
            width="100"
            height={0}
          />
        </div>

        <div>
          <TypographyP>
            <b>Description:</b> {org.description}
          </TypographyP>

          {/* <TypographyP>
            <b>Directors:</b> {org.directors.reduce((a: string, b: string) => a + ", " + b)}
          </TypographyP> */}

          {/*org.members.length > 0 && (
            <TypographyP>
              <b>Members:</b>{" "}
              {org.members.length > 0 ? org.members.reduce((a: string, b: string) => a + ", " + b) : ""}
            </TypographyP>
          )*/}

          {org.mailinglist && (
            <TypographyP>
              <b>Mailing List:</b> <a href={"mailto:" + org.mailinglist}>{org.mailinglist}</a>
            </TypographyP>
          )}

          <TypographyP>
            <b>Type:</b> {org.type}
          </TypographyP>

          <TypographyP>
            <b>Comp Type:</b> {org.comptype}
          </TypographyP>

          <TypographyP>
            <b>Meeting Day and Time:</b> {org.meetingday} {org.meetingtime}
          </TypographyP>

          <TypographyP>
            <b>Time Commitment:</b> {org.timelower}-{org.timeupper} hours per week
          </TypographyP>

          {org.website && (
            <TypographyP>
              <b>Website:</b> <a href={org.website}>{org.website}</a>
            </TypographyP>
          )}
        </div>

        {cardEditsVisible && (
          <div className="flex">
            <Button id="editButton" className="ml-1 mr-1 flex-auto" onClick={handleEdit}>
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="ml-1 mr-1 flex-auto bg-BrightRed text-white" variant="secondary">
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
          </div>
        )}
      </DialogContent>

      {isEditing && <EditOrgDialog id={id} org={org} onClose={() => setIsEditing(false)} />}
    </Dialog>
  );
}
