'use client';
import { Orgs } from "@/lib/firebase/schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { TypographyP } from "@/components/ui/typography";


export default function OrgDetailDialog(org: Orgs) {
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
                <Button variant="outline" onClick={() => { alert('Edit button clicked') }}>Edit</Button>
                <Button variant="outline" onClick={() => { alert('Delete button clicked') }}>Delete</Button>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}