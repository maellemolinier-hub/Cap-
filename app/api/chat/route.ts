import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Conversation avec un assistant. Résout le system prompt côté serveur à
 * partir de l'id de l'assistant (jamais envoyé par le client) et vérifie
 * que l'appelant est bien le propriétaire (ou un admin) avant d'appeler
 * OpenAI — évite qu'un client puisse usurper l'assistant d'un autre.
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { assistantId, messages } = await request.json();

  if (!assistantId || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { data: assistant, error: fetchError } = await supabase
    .from("assistants")
    .select("id, name, system_prompt, owner_id")
    .eq("id", assistantId)
    .single();

  if (fetchError || !assistant) {
    return NextResponse.json({ error: "Assistant introuvable" }, { status: 404 });
  }

  if (assistant.owner_id !== user.id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY non configurée côté serveur." },
      { status: 500 }
    );
  }

  const lastMessages = messages.slice(-20).map((m: { role: string; content: string }) => ({
    role: m.role,
    content: String(m.content).slice(0, 4000),
  }));

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: assistant.system_prompt },
        ...lastMessages,
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("OpenAI error:", body);
    return NextResponse.json(
      { error: "Erreur du service IA" },
      { status: 502 }
    );
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({ reply });
}
