"use client";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const SignOutButton = () => {
  const [isSignInOut, setIsSignInOut] = useState<boolean>(false);
  const handleSignIn = async () => {
    setIsSignInOut(true);
    try {
      await signIn();
    } catch (error) {
      toast.error("There was a problem sign out");
    } finally {
      setIsSignInOut(false);
    }
  };
  return (
    <Button onClick={handleSignIn}>
      {isSignInOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
