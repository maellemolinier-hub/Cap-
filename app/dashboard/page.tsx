import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, company")
    .eq("id", user.id)
    .single();

  const { data: assistants } = await supabase
    .from("assistants")
    .select("id, name, metier")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

  return (
    <DashboardClient
      name={profile?.name ?? user.email ?? "vous"}
      company={profile?.company ?? null}
      assistants={assistants ?? []}
    />
  );
}
