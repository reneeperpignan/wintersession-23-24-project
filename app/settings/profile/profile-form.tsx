"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { updateProfile } from "@/lib/firebase/firestore";
import type { Profile } from "@/lib/firebase/schema";
import { getErrorMessage } from "@/lib/utils";
import { useState, type BaseSyntheticEvent } from "react";

const profileFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((val) => val.trim()),
  biography: z
    .string()
    .max(160, {
      message: "Biography cannot be longer than 160 characters.",
    })
    // Transform empty string or only whitespace input to null before form submission
    .transform((val) => val.trim()),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ profile, userEmail }: { profile: Profile; userEmail: string | null }) {
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = {
    display_name: profile.display_name,
    biography: profile.biography,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const { error } = await updateProfile({ user_id: profile.user_id, ...data });
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }

    setIsEditing(false);

    // Reset form values to the data values that have been processed by zod.
    // This way the user sees any changes that have occurred during transformation
    form.reset(data);

    return toast({
      title: "Profile updated successfully!",
    });
  };

  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)} className="space-y-8">
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input readOnly={!isEditing} placeholder="Display name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input readOnly placeholder={userEmail ?? "Email not found"} />
          </FormControl>
          <FormDescription>This is your verified email address.</FormDescription>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => {
            // We must extract value from field and convert a potential defaultValue of `null` to "" because textareas can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
            const { value, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly={!isEditing}
                    value={value ?? ""}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...rest}
                  />
                </FormControl>
                <FormDescription>A short biography of yourself!</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {isEditing ? (
          <>
            <Button type="submit" className="mr-2">
              Update profile
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </form>
    </Form>
  );
}
