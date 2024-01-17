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
} from "@/components/ui/alert-dialog"


function ClubAlert({ formData, isOpen, onClose }) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You have successfully registered {formData.name}</AlertDialogTitle>
          <AlertDialogDescription>Details:</AlertDialogDescription>
        </AlertDialogHeader>
        <div>{formData.type}, {formData.comptype}</div>
        <div>{formData.description}</div>
        <div>Meeting time: {formData.meetingday}, {formData.meetingtime}</div>
        {formData.logo && <img src={formData.logo} alt="Club Logo"/>}
        {formData.website && <a href={formData.website}>Click here for website</a>}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ClubAlert
