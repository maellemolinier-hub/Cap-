"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    router.push(searchParams.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="block text-center font-bold text-ink-950 text-lg mb-8"
        >
          Cap<span className="text-brand-600">+</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-ink-100 p-8 shadow-sm space-y-4"
        >
          <h1 className="text-xl font-bold text-ink-950 text-center mb-2">
            Connexion
          </h1>

          <div>
            <label htmlFor="email" className="block text-xs text-ink-500 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm text-ink-950 focus:outline-none focus:border-brand-500"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs text-ink-500 mb-1.5"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm text-ink-950 focus:outline-none focus:border-brand-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>

          <p className="text-xs text-ink-300 text-center pt-2">
            Pas encore de compte ? Il est créé par Cap+ après votre commande.
          </p>
        </form>
      </div>
    </main>
  );
}
