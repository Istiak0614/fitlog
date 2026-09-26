"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "@/components/WorkoutCard";

const LibrarySection = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Could not load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <section id="library" className="scroll-mt-24 bg-[#0b0d0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1232px]">
        <div className="mb-6 flex h-[60px] flex-col justify-center">
          <h2 className="display-font text-[26px] font-black uppercase leading-none text-white">
            The Library
          </h2>

          <p className="mt-1 text-[10px] leading-none text-white/40">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        {loading && (
          <div className="grid min-h-[368px] place-items-center border border-white/10 bg-[#111318]">
            <div className="text-center">
              <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#d7ff00]" />

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                Loading workouts...
              </p>
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="border border-red-400/20 bg-red-500/5 p-5 text-sm text-red-200">
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;