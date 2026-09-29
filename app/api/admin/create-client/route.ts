import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Crée un compte client (auth + profil) et, si fourni, un premier assistant.
 * Accès réservé aux comptes is_admin=true (vérifié côté serveur).
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { name, company, email, password, assistant } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Nom, email et mot de passe sont requis." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (createError || !created.user) {
    return NextResponse.json(
      { error: createError?.message || "Échec de la création du compte" },
      { status: 400 }
    );
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: created.user.id,
    name,
    company: company || null,
    is_admin: false,
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  if (assistant?.name && assistant?.metier && assistant?.systemPrompt) {
    const { error: assistantError } = await admin.from("assistants").insert({
      owner_id: created.user.id,
      name: assistant.name,
      metier: assistant.metier,
      system_prompt: assistant.systemPrompt,
    });

    if (assistantError) {
      return NextResponse.json(
        { error: assistantError.message },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ ok: true, userId: created.user.id });
}
