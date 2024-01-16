"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import styled from "styled-components";
import { useAuthContext } from "../(context)/auth-context";

import React, { useState } from 'react';

import { Button } from "@/components/ui/button"

import Form from "./form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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

Button.defaultProps = {
  theme: "Crimson",
};



export default function OrgCatalog() {
  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }
  const [showForm, setShowForm] = useState(false);

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }
  const handleClick = () => {
    console.log("add club clicked");
  };

  const handleSubmit = (formData:FormData) => {
    console.log(formData);
    alert("{formData.name} created");
    // Hide form after submit
  };

  return (
    <>
      <TypographyH2>Student Organization Catalog</TypographyH2>
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {user.email && <TypographyP>Your email is {user.email}</TypographyP>}
      <div className="self-end mt-4"> {/* Align button and form to the right */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handleClick}>Register club</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
            <DialogTitle>Register new club</DialogTitle>
            <DialogDescription>
              Information will be added to our database.
            </DialogDescription>
            </DialogHeader>
              <Form onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
