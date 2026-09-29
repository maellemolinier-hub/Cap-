import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Crée LE PREMIER compte admin (toi). Protégée par BOOTSTRAP_SECRET (à
 * définir dans les variables d'environnement, jamais dans le dépôt) et se
 * désactive d'elle-même dès qu'un admin existe déjà — ne peut pas être
 * utilisée pour en créer un deuxième par erreur ou par un tiers.
 *
 * Usage (une seule fois, après déploiement) :
 * curl -X POST https://<ton-domaine>/api/admin/bootstrap \
 *   -H "Content-Type: application/json" \
 *   -H "x-bootstrap-secret: <BOOTSTRAP_SECRET>" \
 *   -d '{"email":"toi@exemple.com","password":"...","name":"Maëlle"}'
 */
export async function POST(request: Request) {
  const secret = process.env.BOOTSTRAP_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "BOOTSTRAP_SECRET non configurée." },
      { status: 500 }
    );
  }

  if (request.headers.get("x-bootstrap-secret") !== secret) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const admin = createAdminClient();

  const { count } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("is_admin", true);

  if ((count ?? 0) > 0) {
    return NextResponse.json(
      { error: "Un admin existe déjà — cette route ne sert qu'au tout premier." },
      { status: 409 }
    );
  }

  const { email, password, name } = await request.json();
  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "email, password et name sont requis." },
      { status: 400 }
    );
  }

  const { data: created, error: createError } =
    await admin.auth.admin.createUser({ email, password, email_confirm: true });

  if (createError || !created.user) {
    return NextResponse.json(
      { error: createError?.message || "Échec de la création" },
      { status: 400 }
    );
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: created.user.id,
    name,
    is_admin: true,
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
