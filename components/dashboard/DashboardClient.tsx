"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Bot } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AssistantChat } from "@/components/dashboard/AssistantChat";

interface Assistant {
  id: string;
  name: string;
  metier: string;
}

interface DashboardClientProps {
  name: string;
  company: string | null;
  assistants: Assistant[];
}

export function DashboardClient({
  name,
  company,
  assistants,
}: DashboardClientProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(
    assistants[0]?.id ?? null
  );

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const active = assistants.find((a) => a.id === activeId) ?? null;

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-ink-100 flex flex-col">
        <div className="p-5 border-b border-ink-100">
          <p className="font-bold text-ink-950">
            Cap<span className="text-brand-600">+</span>
          </p>
          <p className="text-xs text-ink-400 mt-1 truncate">
            {company ? `${name} · ${company}` : name}
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {assistants.length === 0 && (
            <p className="text-xs text-ink-400 p-3 leading-relaxed">
              Aucun assistant assigné pour l&apos;instant. Il apparaîtra ici
              une fois configuré.
            </p>
          )}
          {assistants.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveId(a.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                a.id === activeId
                  ? "bg-brand-600 text-white"
                  : "text-ink-700 hover:bg-cream-100"
              }`}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span className="min-w-0">
                <span className="block font-medium truncate">{a.name}</span>
                <span
                  className={`block text-xs truncate ${
                    a.id === activeId ? "text-white/70" : "text-ink-400"
                  }`}
                >
                  {a.metier}
                </span>
              </span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-4 border-t border-ink-100 text-sm text-ink-500 hover:text-ink-950 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {active ? (
          <AssistantChat key={active.id} assistantId={active.id} name={active.name} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-ink-400 text-sm px-4 text-center">
            Aucun assistant à afficher.
          </div>
        )}
      </main>
    </div>
  );
}
