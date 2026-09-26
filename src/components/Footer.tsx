import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#1c2026] bg-[#080a0d]">
      <div className="mx-auto flex min-h-[101px] max-w-[1280px] items-center justify-between px-6 lg:px-8">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="grid h-6 w-6 place-items-center">
            <img
              src="/images/logo.png"
              alt="FitLog logo"
              className="h-5 w-5 object-contain"
            />
          </span>

          <span className="display-font text-[14px] font-black tracking-[0.04em] text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-[10px] text-[#686d75]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;