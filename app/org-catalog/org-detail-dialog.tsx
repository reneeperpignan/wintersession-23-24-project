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
import { Orgs } from "@/lib/firebase/schema";


interface OrgDetailDialogProps {
    org: Orgs;
    cardEditsVisible: boolean;
}

export default function OrgDetailDialog({ org, cardEditsVisible }: OrgDetailDialogProps) {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Learn More</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>{org.name}</DialogTitle>
            <DialogDescription>
                <TypographyP><b>Description:</b> {org.description}</TypographyP>
                <TypographyP><b>Directors:</b> {org.directors.reduce((a: string, b: string) => a + ', ' + b)}</TypographyP>
                <TypographyP><b>Members:</b> {org.members.reduce((a: string, b: string) => a + ', ' + b)}</TypographyP>
                <TypographyP><b>Mailing List:</b> <a href={org.mailinglist}>{org.mailinglist}</a></TypographyP>
                <TypographyP><b>Type:</b> {org.type}</TypographyP>
                <TypographyP><b>Comp Type:</b> {org.comptype}</TypographyP>
                <TypographyP><b>Meeting Time:</b> {org.meetingtime}</TypographyP>               
                <TypographyP><b>Time Commitment:</b> {org.timecommitment}</TypographyP>
                {cardEditsVisible && <Button id="editButton" variant="outline" onClick={() => { alert('Edit button clicked') }}>Edit</Button>}
                {cardEditsVisible && <Button id="deleteButton" variant="outline" onClick={() => { alert('Delete button clicked') }}>Delete</Button>}
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}
