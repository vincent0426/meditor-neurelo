"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

type LoginProvider = "google";

const useLogin = (loginProvider: LoginProvider) => {
  const supabase = createClient();

  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  if (next && next !== "/") {
    // customise the toast
    toast.error("You must be logged in to access this page", {
      id: "login-required",
      duration: 5000,
    });
  }

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: loginProvider,
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${origin}/auth/callback?next=${next}`,
      },
    });
  };

  return { login };
};

export default useLogin;
