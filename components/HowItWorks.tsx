import { Search, Wrench, Rocket, KeySquare } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Découverte",
    description:
      "On identifie le besoin réel du client : son métier, ses outils, ce qu'il veut déléguer à l'assistant.",
  },
  {
    num: "02",
    icon: Wrench,
    title: "Configuration",
    description:
      "L'assistant est construit sur mesure : connaissances, ton, connexions à ses outils (CRM, email…).",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Livraison",
    description:
      "Le client reçoit son compte nominatif dans Cap+, avec son assistant prêt à l'emploi et une prise en main.",
  },
  {
    num: "04",
    icon: KeySquare,
    title: "Propriété",
    description:
      "L'assistant et sa configuration appartiennent au client — ce n'est pas un accès locatif à un outil partagé.",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-600 uppercase mb-3">
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-950">
            De la découverte à l&apos;assistant livré
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%_-_16px)] w-8 h-px bg-ink-200 z-10" />
              )}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-ink-950 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-semibold text-ink-950">{step.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
