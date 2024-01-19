"use client";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { type UserInfo } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import OrgCardCatalog from "./org-card";

export default function RenderOrgs(uid: UserInfo) {
  const [orgData, setOrgData] = useState<Orgs[]>([]); // Do we have loading or error states

  useEffect(() => {
    const q = query(collection(db, "organizations"));

    // Map queried organization information to Orgs type
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

  return (
    <div className="flex h-screen w-screen flex-wrap items-center justify-center space-x-4">
      {orgData.map((organization: Orgs) => (
        <div key={organization.id}>
          <OrgCardCatalog orgid={organization.id} uid={uid.uid} organization={organization} />
        </div>
      ))}
    </div>
  );
}
