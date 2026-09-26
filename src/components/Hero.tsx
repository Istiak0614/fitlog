import React from 'react'
import {ArrowDownRight,} from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-[#090a0c] px-5 py-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#15171c]">
          <div className="grid min-h-[370px] items-center lg:grid-cols-[1fr_360px]">
            <div className="relative z-10 px-[46px] py-[42px] sm:px-[46px] lg:pl-[46px] lg:pr-0">
              <p
                className="mb-[21px] text-[11px] font-black uppercase leading-none tracking-[0.03em] text-[#c9ff00]">
                Workout Library
              </p>
              <h1 className="display-font text-[43px] font-black uppercase leading-[0.94] tracking-[-0.015em] text-white sm:text-[48px] lg:text-[55px]">
                <span className="block sm:whitespace-nowrap">
                  Train With Intent. Log
                </span>

                <span className="block">Every Set.</span>
              </h1>
              <p className="mt-[17px] max-w-[560px] text-[14px] leading-[20px] text-[#91949d]">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                into today&apos;s plan, and watch the week&apos;s work add up.
              </p>

              <a href="#library" className="mt-[24px] inline-flex h-[34px] items-center justify-center gap-2 rounded-[5px]
                  bg-[#c9ff00]
                  px-[20px]
                  text-[10px]
                  font-black
                  uppercase
                  text-black
                  transition
                  duration-200
                  hover:brightness-110
                "
              >
                Browse Workouts
                <ArrowDownRight size={14}/>
              </a>
            </div>
            <div
              className="relative hidden h-full min-h-[370px] items-center justify-center lg:flex">
              <img
                src="/images/banner.png"
                alt="FitLog workout"
                className="absolute right-[60px] top-1/2 w-[250px] -translate-y-1/2 object-contain"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;