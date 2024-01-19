"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { type Orgs } from "@/lib/firebase/schema";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";

import { db } from "@/lib/firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddOrgDialog from "./add-org-dialog";
import OrgCardCatalog from "./org-card";

export default function OrgCatalog() {
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

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <>
      <TypographyH2>Student Organization Catalog</TypographyH2>
      <TypographyP>
        Organizations offered by the College. {user.email && <TypographyP>Your email is {user.email}</TypographyP>}
      </TypographyP>

      <AddOrgDialog />
      <div className="flex h-screen w-screen flex-wrap items-center justify-center">
        {orgData.map((organization: Orgs) => (
          <div key={organization.id}>
            <OrgCardCatalog orgid={organization.id} userid={user.uid} organization={organization} />
          </div>
        ))}
      </div>
    </>
  );
}
