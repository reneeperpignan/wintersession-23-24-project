"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { collection, onSnapshot, query } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "./(context)/auth-context";
import RenderComp from "./comping/render-comp";
import RenderJoined from "./joined/render-joined";

export default function Home() {
  const { user } = useAuthContext();

  const [orgData, setOrgData] = useState<Orgs[]>([]);

  useEffect(() => {
    const q = query(collection(db, "orgs"));
    //where("members", "array-contains", userid.uid)
    const unsub = onSnapshot(q, (snapshot) => {
      const orgList: Orgs[] = snapshot.docs.map(
        (doc): Orgs =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as Orgs,
      );
      setOrgData(orgList);
    });
    return unsub;
  }, []);

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }
  if (!user || user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  if (!user || user == null) {
    // this is a protected route - only users who are signed in can view this route
    return (
      <>
        <TypographyH2 className="bg-Crimson">Welcome to the T4SG starter project!</TypographyH2>
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

        <RenderJoined
          uid={user.uid}
          displayName={user.displayName}
          email={user.email} //all things we don't need rn
          phoneNumber={null}
          photoURL={null}
          providerId=""
        />

        <TypographyH2>Clubs currently comping</TypographyH2>
        <br />

        <RenderComp
          uid={user.uid}
          displayName={user.displayName}
          email={user.email} //all things we don't need rn
          phoneNumber={null}
          photoURL={null}
          providerId=""
        />
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
