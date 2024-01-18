"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { type Orgs } from "@/lib/firebase/schema";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import OrgCardCatalog from "./org-card";
import OrgCardComp from "./org-card-comp";
import OrgCardCurrent from "./org-card-current";
import OrgDetailDialog from "./org-detail-dialog";
import RenderOrgs from "./render-orgs";

// const MathClub: Orgs = {
//   id: "123",
//   name: "MathClub",
//   description: "Doing math",
//   directors: ["josh", "jodie"],
//   members: ["abe", "bee", "cal"],
//   mailinglist: "mathclub@email.org",
//   type: "academic",
//   comptype: "comp optional",
//   // think about how we want to do meeting time? two separate entries?
//   meetingtime: "6 pm Monday",
//   timelower: 5,
//   timeupper: 6,
// };

import { useState } from "react";

import { Button } from "@/components/ui/button";

import ClubAlert from "./alert";
import Form from "./form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const theme = {
  Crimson: {
    default: "#A41034",
    hover: "#CA0000",
  },
};

// const Button = styled.button
//   background-color: ${(props) => theme[props.theme].default};
//   color: white;
//   padding: 5px 15px;
//   border-radius: 5px;
//   outline: 0;
//   text-transform: uppercase;
//   margin: 10px 0px;
//   cursor: pointer;
//   transition: ease background-color 250ms;
//   &:hover {
//     background-color: ${(props) => theme[props.theme].hover};
//   }
//   &:disabled {
//     cursor: default;
//     opacity: 0.7;
//   }
// ;

// Button.defaultProps = {
//   theme: "Crimson",
// };

export default function OrgCatalog() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }
  const handleClick = () => {
    console.log("register club clicked");
    setIsFormOpen(true);
  };

  const handleSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    setFormData(data);
    setIsDialogOpen(true);
    setIsFormOpen(false);
    // Hide form after submit
  };

  return (
    <>
      <TypographyH2>Student Organization Catalog</TypographyH2>
      {/* Render all clubs */}
      <RenderOrgs
        uid={user.uid}
        displayName={user.displayName}
        email={user.email} //all things we don't need rn
        phoneNumber={null}
        photoURL={null}
        providerId=""
      />


      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {user.email && <TypographyP>Your email is {user.email}</TypographyP>}
      <div className="mt-4 self-end">
        {" "}
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
              <Form onSubmit={handleSubmit} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {isDialogOpen && formData && (
        <ClubAlert formData={formData} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      )}
      <OrgDetailDialog
        org={{
          id: "org_1",
          name: "Tech for Social Good",
          description:
            "Harvard Tech for Social Good (T4SG) leverages Harvard talent to \
                        partner with nonprofits, government agencies, and social impact \
                        organizations to amplify their impact through technology. Students \
                        can develop their expertise in software engineering, user experience, \
                        and ethics through semester-long projects with real-world clients.",
          members: ["profile_1", "profile_2", "profile_3", "profile_4", "profile_5"],
          directors: ["profile_1", "profile_4"],
          mailinglist: "https://socialgood.hcs.harvard.edu/",
          type: "Technology",
          comptype: "Competitive",
          meetingtime: "Mondays 6-8 PM",
          timeupper: 7,
          timelower: 10,
          meetingday: "Tuesday",
          logo: "string",
          website: "www.google.com",
        }}
        cardEditsVisible={true}
      />
    </>
  );
}
