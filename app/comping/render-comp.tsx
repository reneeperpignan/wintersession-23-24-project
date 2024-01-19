"use client";
import { TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../(context)/auth-context";
import OrgCardComp from "../org-catalog/org-card-comp";

export default function RenderComp(userid: UserInfo) {
  const { user } = useAuthContext();

  const [orgData, setOrgData] = useState<Orgs[]>([]);
  console.log("from render comp userid: ", userid.uid);

  useEffect(() => {
    const q = query(collection(db, "orgs"), where("comping", "array-contains", userid.uid));
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
  }, [userid.uid]);

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <div>
      <div className="flex w-screen flex-wrap items-center justify-left gap-x-4 gap-y-4">
        {orgData.map((organization: Orgs) => (
          <div key={organization.id}>
            <OrgCardComp orgid={organization.id} userid={user.uid} organization={organization} />
          </div>
        ))}
      </div>
    </div>
  );
}
