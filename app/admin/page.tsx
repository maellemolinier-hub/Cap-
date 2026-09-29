"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      company: form.get("company"),
      email: form.get("email"),
      password: form.get("password"),
      assistant: {
        name: form.get("assistantName"),
        metier: form.get("assistantMetier"),
        systemPrompt: form.get("assistantPrompt"),
      },
    };

    const res = await fetch("/api/admin/create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Erreur");
      setStatus("idle");
      return;
    }

    setStatus("done");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <main className="min-h-screen bg-cream-100 py-16 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/dashboard" className="text-sm text-ink-500 hover:text-ink-950">
          ← Retour au dashboard
        </Link>

        <h1 className="text-2xl font-bold text-ink-950 mt-4 mb-1">
          Nouveau client
        </h1>
        <p className="text-sm text-ink-500 mb-8">
          Crée le compte et, si tu l&apos;as déjà défini, son premier
          assistant. Tu pourras en ajouter d&apos;autres plus tard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-ink-100 p-6 space-y-5"
        >
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">
              Client
            </legend>
            <input
              name="name"
              required
              placeholder="Nom du client"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              name="company"
              placeholder="Société (optionnel)"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email de connexion"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              name="password"
              type="text"
              required
              placeholder="Mot de passe temporaire"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm"
            />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">
              Premier assistant (optionnel)
            </legend>
            <input
              name="assistantName"
              placeholder="Nom de l'assistant"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              name="assistantMetier"
              placeholder="Métier (ex. Commercial, SAV…)"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm"
            />
            <textarea
              name="assistantPrompt"
              rows={4}
              placeholder="System prompt — instructions de l'assistant"
              className="w-full bg-cream-100 border border-ink-100 rounded-xl px-4 py-2.5 text-sm resize-none"
            />
          </fieldset>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {status === "done" && (
            <p className="text-sm text-green-600">Client créé.</p>
          )}

          <button
            type="submit"
            disabled={status === "saving"}
            className="w-full bg-ink-950 hover:bg-ink-800 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
          >
            {status === "saving" ? "Création…" : "Créer le client"}
          </button>
        </form>
      </div>
    </main>
  );
}
