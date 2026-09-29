"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AssistantChat({
  assistantId,
  name,
}: {
  assistantId: string;
  name: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const next = [...messages, { role: "user" as const, content: input }];
    setMessages(next);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantId, messages: next }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erreur serveur");
      }

      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <header className="px-6 py-4 border-b border-ink-100 bg-white">
        <h1 className="font-semibold text-ink-950">{name}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-ink-400">
            Écrivez à {name} ci-dessous pour démarrer la conversation.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-lg rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-brand-600 text-white"
                : "bg-white border border-ink-100 text-ink-800"
            }`}
          >
            {m.content}
          </div>
        ))}
        {error && (
          <p className="text-sm text-red-600 max-w-lg">
            {error}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-ink-100 bg-white flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Votre message…"
          className="flex-1 bg-cream-100 border border-ink-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={sending}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white p-2.5 rounded-full transition-colors"
          aria-label="Envoyer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
