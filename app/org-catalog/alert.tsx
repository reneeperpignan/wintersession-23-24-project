import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface ClubAlertProps {
  name: string;
  type: string;
  comptype: string;
  description: string;
  meetingday: string;
  meetingtime: string;
  logo: string;
  website: string;
  isOpen: boolean;
  onClose: () => void;
}

function ClubAlert({
  name,
  type,
  comptype,
  description,
  meetingday,
  meetingtime,
  logo,
  website,
  isOpen,
  onClose,
}: ClubAlertProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You have successfully registered {name}</AlertDialogTitle>
          <AlertDialogDescription>Details:</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          {type}, {comptype}
        </div>
        <div>{description}</div>
        <div>
          Meeting time: {meetingday},{meetingtime}
        </div>
        {logo && <Image src={logo} alt="Club Logo" />}
        {website && <a href={website}>Click here for website</a>}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ClubAlert;
