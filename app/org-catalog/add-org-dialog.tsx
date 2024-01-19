"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Orgs } from "@/lib/firebase/schema";
import { useState } from "react";
import AddForm from "./form";

export default function AddOrgDialog() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [formData, setFormData] = useState<Orgs[]>([]);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log(isSubmitted);
  const handleClick = () => {
    console.log("register club clicked");
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Orgs) => {
    console.log(data);
    setIsSubmitted(true);
    // setIsDialogOpen(true);
    setIsFormOpen(false);
    // Hide form after submit
  };

  return (
    //add org dialog component goes here!
    <div>
      {/* {isDialogOpen && formData && (
        <ClubAlert formData={formData} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      )} */}
      <div className="mt-4 self-end">
        {/* Align button and form to the right */}
        <Button variant="outline" onClick={handleClick}>
          Register club
        </Button>
        <Dialog open={isFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register new club</DialogTitle>
              <DialogDescription>Information will be added to our database.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <AddForm onSubmit={() => void handleSubmit} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
