"use client";

import Link from "next/link";
import {usePathname,} from "next/navigation";
import {Menu, X,} from "lucide-react";
import {useState,} from "react";
import {usePlan,} from "@/context/PlanContext";

const navItems = [
  {
    label: "Workouts",
    href: "/",
  },
  {
    label: "My Plan",
    href: "/my-plan",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const {
    plan,
    saved,
  } = usePlan();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const isActive = (
    href: string
  ) => {
    if (
      href === "/"
    ) {
      return (
        pathname === "/" ||
        pathname.startsWith(
          "/workout/"
        )
      );
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c2026] bg-[#0d0f13]">
      <div className="mx-auto flex h-[80px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex shrink-0 items-center gap-2">
          <img
            src="/images/logo.png"
            alt="FitLog logo"
            className="h-[24px] w-[24px] object-contain"/>
          <span className="display-font text-[17px] font-black uppercase tracking-[0.04em] text-white">
            FitLog
          </span>
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex" aria-label="Primary navigation">
          {navItems.map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-[8px] text-[11px] font-medium transition ${
                  isActive(
                    item.href
                  )
                    ? "bg-[#1d2907] text-[#c8ff00]"
                    : "text-[#8b8f96] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden items-center gap-6 md:flex">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[11px] text-[#c7c9cd] transition hover:text-white"
          >
            <span>
              Plan
            </span>

            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#c8ff00] px-1 text-[9px] font-black text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[11px] text-[#7a7e85] transition hover:text-white"
          >
            <span>
              Saved
            </span>

            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full border border-[#383d45] px-1 text-[9px] font-medium text-[#8b9098]">
              {saved.length}
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (previous) =>
                !previous
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#2b3038] text-white md:hidden"
        >
          {menuOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-[#1f2329] bg-[#0d0f13] px-5 py-4 md:hidden">
          <nav
            className="mx-auto flex max-w-[1280px] flex-col gap-2"
            aria-label="Mobile navigation"
          >
            {navItems.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                  className={`rounded-md px-4 py-3 text-[12px] font-medium ${
                    isActive(
                      item.href
                    )
                      ? "bg-[#1d2907] text-[#c8ff00]"
                      : "text-[#8b8f96]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-2 flex gap-3 border-t border-[#22262d] pt-4">
              <Link
                href="/my-plan"
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#2d323a] px-3 py-2 text-[11px] text-white">
                Plan
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c8ff00] text-[9px] font-black text-black">
                  {plan.length}
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#2d323a] px-3 py-2 text-[11px] text-[#9ca0a6]">
                Saved
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#444a53] text-[9px]">
                  {saved.length}
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;