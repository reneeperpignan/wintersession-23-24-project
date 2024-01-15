"use client";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { type Profile } from "@/lib/firebase/schema";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Typing for authentication context
interface AuthContextType {
  user: User | "loading" | null;
  profile: Profile | "loading" | null;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
  user: "loading",
  profile: "loading",
});

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<User | "loading" | null>("loading");

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
        // TODO Figure out redirecting
      }
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, []);

  const [profile, setProfile] = useState<Profile | "loading" | null>("loading");
  useEffect(() => {
    if (user === "loading" || user === null) {
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "profiles", user.uid), (doc) => {
      if (doc.exists()) {
        setProfile({ ...doc.data(), user_id: doc.id } as Profile);
      }
    });
    return unsubscribe;
  }, [user]);

  // Provide the authentication context to child components
  return <AuthContext.Provider value={{ user, profile }}>{children}</AuthContext.Provider>;
}
