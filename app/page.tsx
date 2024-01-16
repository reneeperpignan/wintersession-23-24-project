"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { useAuthContext } from "./(context)/auth-context";
import React, { useState } from 'react';

import { Button } from "@/components/ui/button"

import Form from "./form";





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
  const [showForm, setShowForm] = useState(false);
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
      </>
    );
  }
  const handleClick = () => {
    console.log("add club clicked");
    setShowForm(!showForm)
  };

  const handleSubmit = (formData:FormData) => {
    console.log(formData);
    setShowForm(false); // Hide form after submit
  };

  if (!user || user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }
  return (
    <div className="flex flex-col items-center">
      <TypographyH2>Hi {user.displayName}!</TypographyH2>
      <TypographyH2>Welcome back to SOCO</TypographyH2>
      {user.email && <TypographyP>You are logged in as {user.email}</TypographyP>}
      <div className="self-end mt-4"> {/* Align button and form to the right */}
        <Button variant="outline" onClick={handleClick}>Register club</Button>
        {showForm && <Form onSubmit={handleSubmit} />}
      </div>
    </div>

  );
}
