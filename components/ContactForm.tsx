"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

/**
 * Formulaire de contact — UI + validation seulement pour l'instant.
 * `handleSubmit` n'envoie nulle part : aucun backend/service d'emailing
 * n'est branché. À faire avant mise en prod : brancher une route
 * (ex. /api/contact + service email) ou un service tiers (Formspree,
 * Resend...) et remplacer la simulation ci-dessous par un vrai appel.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: remplacer par un vrai envoi (route API + service email).
    setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="max-w-md mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-8">
        <p className="text-white font-semibold">Message enregistré.</p>
        <p className="text-sm text-white/50 mt-1">
          (Formulaire pas encore branché à un envoi réel — à connecter côté
          serveur avant mise en ligne.)
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-left space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-xs text-white/50 mb-1.5">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs text-white/50 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500"
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs text-white/50 mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 resize-none"
          placeholder="Votre besoin, votre activité…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-full transition-colors"
      >
        {status === "sending" ? "Envoi…" : "Envoyer"}
        {status !== "sending" && <Send className="w-4 h-4" />}
      </button>
    </form>
  );
}
