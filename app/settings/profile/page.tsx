"use client";
import { useAuthContext } from "@/app/(context)/auth-context";
import { Separator } from "@/components/ui/separator";
import { TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";

export default function Settings() {
  const { user, profile } = useAuthContext();

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }
  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
        </div>
        <Separator />
        {profile === "loading" ? (
          <TypographyP>Loading profile...</TypographyP>
        ) : !profile ? (
          <TypographyP>Profile not found</TypographyP>
        ) : (
          <ProfileForm profile={profile} userEmail={user.email} />
        )}
      </div>
    </>
  );
}
