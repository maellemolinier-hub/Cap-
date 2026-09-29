import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

// Source : grille Cerveau Central (Google Sheets) — offre "Assistants
// métier & agent IA vocal", persona Dirigeant TPE/PME. Sur devis, pas de
// tarif fixe affiché : 2 500 € est un panier moyen, pas un prix engagé.
const features = [
  "Analyse préalable de votre métier et de vos process",
  "Assistant IA sur mesure — texte ou agent vocal, selon le besoin",
  "Règle d'or : l'IA prépare, vous validez toujours avant tout envoi",
  "Formation à l'usage incluse",
  "Vous devenez propriétaire de votre assistant — pas un accès locatif",
];

export function Pricing() {
  return (
    <section id="offre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-600 uppercase mb-3">
            L&apos;offre
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-950 mb-4">
            Assistants métier &amp; agent IA vocal
          </h2>
          <p className="text-ink-500 text-lg">
            Propriétaire, pas prisonnier — vous restez maître de votre outil,
            de vos données et de votre relation client.
          </p>
        </Reveal>

        <Reveal className="max-w-md mx-auto bg-white rounded-3xl border-2 border-brand-600 ring-2 ring-brand-600 p-8 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-ink-500">Sur devis</p>
            <p className="text-sm text-ink-400 mt-1">
              Panier moyen ~2 500 € — dépend de votre métier et de vos
              process
            </p>
          </div>

          <Link
            href="#contact"
            className="block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all mb-8 bg-brand-600 hover:bg-brand-700 text-white"
          >
            Échange découverte — 15 min
          </Link>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-ink-700">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
