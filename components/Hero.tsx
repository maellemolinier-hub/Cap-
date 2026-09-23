"use client";

import Link from "next/link";
import { ArrowRight, Users, Sparkles, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const badges = [
  { icon: Users, label: "Comptes nominatifs illimités" },
  { icon: ShieldCheck, label: "Livré propriétaire" },
];

const features = [
  {
    icon: Users,
    title: "Comptes nominatifs illimités",
    description:
      "Chaque client a son propre compte dans Cap+. Pas de plafond sur le nombre de clients que tu peux piloter.",
  },
  {
    icon: Sparkles,
    title: "Assistants métiers sur mesure",
    description:
      "Configurés selon le besoin réel de chaque client — pas un bot générique. Un commercial, un comptable, un SAV… ce qu'il lui faut.",
  },
  {
    icon: ShieldCheck,
    title: "Livré propriétaire",
    description:
      "L'assistant appartient au client : sa configuration, ses données. Pas un accès locatif à un outil partagé.",
  },
];

export function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream-100 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#0d0d0e 1px, transparent 1px),
                             linear-gradient(to right, #0d0d0e 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <Reveal className="flex flex-wrap justify-center gap-2">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 bg-white border border-ink-100 rounded-full px-3.5 py-1.5 text-xs font-medium text-ink-600 shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-ink-400" />
                {label}
              </span>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-950 leading-[1.08] tracking-tight text-balance">
              Cap<span className="text-brand-600">+</span>, le pilote de vos
              assistants métiers clients
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-lg text-ink-500 leading-relaxed">
              Un compte nominatif par client, un assistant métier configuré
              pour son besoin, livré en propriété — pas un bot générique
              loué.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-premium shadow-md shadow-brand-600/20 hover:-translate-y-0.5"
              >
                Être prévenu au lancement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#offre"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-ink-50 text-ink-900 font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-premium border border-ink-200"
              >
                Voir l&apos;offre
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest text-brand-600 uppercase mb-3">
              Le principe
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink-950">
              Un assistant par client, pas un outil générique
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }, i) => (
              <Reveal
                key={title + i}
                delay={i * 80}
                className="bg-cream-100 rounded-2xl p-6 border border-ink-100"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-ink-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-ink-950 mb-2">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
