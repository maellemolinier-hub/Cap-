"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-premium ${
        scrolled
          ? "bg-cream-50/90 backdrop-blur-md shadow-sm border-b border-ink-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-ink-950 flex items-center justify-center group-hover:bg-ink-800 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-ink-950 text-lg tracking-tight">
              Cap<span className="text-brand-600">+</span>
            </span>
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            Être prévenu au lancement
          </Link>
        </div>
      </nav>
    </header>
  );
}
