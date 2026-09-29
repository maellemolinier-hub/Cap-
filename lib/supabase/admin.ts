import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client admin (clé service_role) — ne jamais importer depuis un composant
 * client ni exposer au navigateur. Utilisé uniquement dans les routes API
 * protégées par une vérification `is_admin` côté serveur.
 *
 * Nécessite SUPABASE_SERVICE_ROLE_KEY en variable d'environnement (jamais
 * dans le dépôt) — à copier depuis Supabase > Settings > API > service_role.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquante — à configurer dans les variables d'environnement (jamais dans le dépôt)."
    );
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
