"use client";
import { TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../(context)/auth-context";
import OrgCardCurrent from "../org-catalog/org-card-comp";

export default function RenderJoined(userid: UserInfo) {
  const { user } = useAuthContext();

  const [orgData, setOrgData] = useState<Orgs[]>([]);

  useEffect(() => {
    const q = query(collection(db, "orgs"), where("members", "array-contains", userid.uid));
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
  }, [userid]);

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <div>
      <div className="flex h-screen w-screen flex-wrap items-center justify-center">
        {orgData.map((organization: Orgs) => (
          <div key={organization.id}>
            <OrgCardCurrent orgid={organization.id} userid={user.uid} organization={organization} />
          </div>
        ))}
      </div>
    </div>
  );
}