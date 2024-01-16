"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import styled from "styled-components";
import { useAuthContext } from "../(context)/auth-context";

const theme = {
  Crimson: {
    default: "#A41034",
    hover: "#CA0000",
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "Crimson",
};

function clickMe() {
  alert("You clicked me!");
}


export default function OrgCatalog() {
  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <>
      <TypographyH2>Student Organization Catalog</TypographyH2>
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      <div>
        <Button onClick={clickMe}>Add Organization</Button>
      </div>
      {user.email && <TypographyP>Your email is {user.email}</TypographyP>}
    </>
  );
}
