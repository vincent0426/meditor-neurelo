import { createClient } from "@/lib/supabase/client";

const useLogout = () => {
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();

    location.href = "/auth/login";
  };

  return { logout };
};

export default useLogout;
