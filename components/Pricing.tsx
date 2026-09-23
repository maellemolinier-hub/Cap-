import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const offers = [
  {
    name: "Forfait installation",
    tagline: "Pour démarrer avec un client",
    price: "à partir de 1 500 €",
    period: "one-shot, par assistant",
    highlight: false,
    features: [
      "Découverte du besoin",
      "Configuration de l'assistant métier",
      "Connexion à ses outils (CRM, email…)",
      "Formation à l'usage",
      "Compte nominatif livré, client autonome",
    ],
  },
  {
    name: "Accompagnement",
    tagline: "Pour la relation dans la durée",
    price: "à partir de 300 €",
    period: "/ mois, par client",
    highlight: true,
    features: [
      "Tout le Forfait installation",
      "Hébergement de l'assistant",
      "Mises à jour et optimisation continue",
      "Ajout de nouveaux assistants métiers",
      "Support prioritaire",
    ],
  },
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
            Un démarrage simple, une relation qui dure
          </h2>
          <p className="text-ink-500 text-lg">
            Le forfait installation pour lancer un client, l&apos;accompagnement
            pour le faire grandir. Les deux se combinent.
          </p>
        </Reveal>

        <p className="text-center text-xs text-ink-300 max-w-xl mx-auto mb-12">
          Prix indicatifs, à ajuster selon vos coûts réels — pas des tarifs
          engagés.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto items-start">
          {offers.map((offer, i) => (
            <Reveal
              key={offer.name}
              delay={i * 100}
              className={`bg-white rounded-3xl border-2 p-8 relative shadow-sm ${
                offer.highlight
                  ? "border-brand-600 ring-2 ring-brand-600"
                  : "border-ink-100"
              }`}
            >
              {offer.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Revenu récurrent
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-ink-950">
                  {offer.name}
                </h3>
                <p className="text-sm text-ink-500 mt-0.5">{offer.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-ink-950">
                  {offer.price}
                </div>
                <p className="text-sm text-ink-400 mt-1">{offer.period}</p>
              </div>

              <Link
                href="#contact"
                className={`block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all mb-8 ${
                  offer.highlight
                    ? "bg-brand-600 hover:bg-brand-700 text-white"
                    : "bg-ink-950 hover:bg-ink-800 text-white"
                }`}
              >
                En discuter
              </Link>

              <ul className="space-y-3">
                {offer.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-ink-700">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
