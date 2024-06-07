import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthContextProvider } from "@/components/context/AuthContextProvider";
export default async function Layout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
