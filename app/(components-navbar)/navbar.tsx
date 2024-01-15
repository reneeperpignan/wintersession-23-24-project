"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthContext } from "../(context)/auth-context";

export default function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { user } = useAuthContext();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Home
      </Link>
      {user && user != "loading" && (
        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
      )}
    </nav>
  );
}
