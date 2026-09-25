"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

const navItems = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/workout/");
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="FitLog home">

              <img src="/images/logo.png" alt="FitLog logo" className="h-9 w-9 object-contain" />
          <span className="display-font text-xl font-black tracking-[0.18em] text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-bold uppercase tracking-[0.16em] transition ${
                isActive(item.href)
                  ? "text-[#d7ff00]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#d7ff00] px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition hover:brightness-110"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:border-[#d7ff00] hover:text-[#d7ff00]"
          >
            Saved {saved.length}
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-white/15 text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0b0b0b] px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`border-l-2 px-4 py-3 text-sm font-bold uppercase tracking-wider ${
                  isActive(item.href)
                    ? "border-[#d7ff00] bg-[#d7ff00]/5 text-[#d7ff00]"
                    : "border-transparent text-white/65"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#d7ff00] px-4 py-2 text-center text-xs font-black uppercase text-black"
              >
                Plan {plan.length}
              </Link>
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/30 px-4 py-2 text-center text-xs font-black uppercase text-white"
              >
                Saved {saved.length}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
