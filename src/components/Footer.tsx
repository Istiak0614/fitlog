import React from 'react'
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center text-[#d7ff00]">
            <Dumbbell size={18} />
          </span>
          <span className="display-font font-black tracking-[0.16em] text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-xs leading-6 text-white/40 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

export default Footer;