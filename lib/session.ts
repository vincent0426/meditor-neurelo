import { Users } from "neurelo-sdk";

import { getUserById } from "@/lib/query/users/get-user-by-id";
import { createClient } from "@/lib/supabase/server";

export default async function getCurrentUser(): Promise<Users | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error);

    return null;
  }

  const res = await getUserById(data.user.id);

  return res?.data ?? null;
}
