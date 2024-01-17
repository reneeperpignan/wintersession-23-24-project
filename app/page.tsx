"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import Card from "react-bootstrap/Card";
import { useAuthContext } from "./(context)/auth-context";
import OrgDetailDialog from "./org-catalog/org-detail-dialog";

import styled, { type DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  Crimson: {
    default: "#A41034",
    hover: "#CA0000",
  },
};

console.log(theme);

// things that caused errors:
//  background-color: ${(props) => theme[props.theme].default};

// &:hover {
//   background-color: ${(props) => theme[props.theme].hover};
// }
const Button = styled.button`
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  transition: ease background-color 250ms;

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

// Button.defaultProps = {
//   theme: "Crimson",
// };

// function ProfileForm() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//     },
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values)
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }

export default function Home() {
  const { user } = useAuthContext();
  if (!user || user == null) {
    // this is a protected route - only users who are signed in can view this route
    return (
      <>
        <TypographyH2>Welcome to the T4SG starter project!</TypographyH2>
        <TypographyP>
          This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Feel free to add
          your own components!
        </TypographyP>
        <TypographyP>
          This page is an unprotected route accessible to anyone who visits the website. Log in to view authenticated
          routes!
        </TypographyP>
        <OrgDetailDialog
          id="" //we be using the uid
          name="Tech for Social Good"
          description="Harvard Tech for Social Good (T4SG) leverages Harvard talent to partner with nonprofits,
                     government agencies, and social impact organizations to amplify their impact through technology.
                     Students can develop their expertise in software engineering, user experience, and ethics through
                     semester-long projects with real-world clients."
          members={["profile_1", "profile_2", "profile_3", "profile_4", "profile_5"]}
          directors={["profile_1", "profile_4"]}
          mailinglist="https://socialgood.hcs.harvard.edu/"
          type="Technology"
          comptype="Competitive"
          meetingtime="Mondays 6-8 PM"
          timelower={7}
          timeupper={10}
          meetingday="Tuesday"
          logo=""
          website="www.google.com"
        />
      </>
    );
  }

  if (!user || user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <TypographyH2>Hi {user.displayName}!</TypographyH2>
        <TypographyH2>Welcome back to SOCO</TypographyH2>
        {user.email && <TypographyP>You are logged in as {user.email}</TypographyP>}
      </div>
      <div className="items-left">
        <TypographyH2>My Clubs</TypographyH2>
        <br />
        <Card style={{ width: "18rem" }} className="bg-body mb-5 rounded p-3 shadow-lg">
          <Card.Img variant="top" src="https://www.colorhexa.com/a41034.png" style={{ height: 180 }} width="100%" />
          <Card.Body>
            <Card.Title>Harvard Tech for Social Good</Card.Title>
            <Card.Subtitle>Meeting times</Card.Subtitle>
            <Card.Text>Explanation of the club.</Card.Text>
            <Button>Check out future events</Button>
          </Card.Body>
        </Card>
        <br />
        <TypographyH2>Clubs currently comping</TypographyH2>
        <br />
        <p>No clubs currently comping</p>
        <br />
      </div>
      <div className="items-end">
        <TypographyH2>Contact us</TypographyH2>
        <TypographyP>Email: tech4sg@harvard.edu</TypographyP>
        <TypographyP>Cell: 123-456-789</TypographyP>
      </div>
    </div>
  );
}
