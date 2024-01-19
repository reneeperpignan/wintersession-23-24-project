import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type Orgs } from "@/lib/firebase/schema";
import Image from "next/image";

interface ClubAlertProps {
  formData: Orgs;
  isOpen: boolean;
  onClose: () => void;
}

function ClubAlert({ formData, isOpen, onClose }: ClubAlertProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You have successfully registered {formData.name}</AlertDialogTitle>
          <AlertDialogDescription>Details:</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          {formData.type ? formData.type : ""}, {formData.comptype ? formData.comptype : ""}
        </div>
        <div>{formData.description ? formData.description : ""}</div>
        <div>
          Meeting time: {formData.meetingday ? formData.meetingday : "tbd"},{" "}
          {formData.meetingtime ? formData.meetingtime : ""}
        </div>
        {formData.logo && <Image src={formData.logo} alt="Club Logo" />}
        {formData.website && <a href={formData.website}>Click here for website</a>}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ClubAlert;
