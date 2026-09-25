"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const filteredWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return workouts;

    return workouts.filter((workout) =>
      [workout.name, workout.equipment, ...workout.muscleGroups]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search, workouts]);

  return (
    <section id="library" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#d7ff00]">
              All movements
            </p>
            <h2 className="display-font text-4xl font-black uppercase text-white sm:text-5xl">
              The Library
            </h2>
            <p className="mt-3 text-white/48">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <label className="flex w-full max-w-sm items-center gap-3 border border-white/15 bg-[#111] px-4 py-3 text-white/50 focus-within:border-[#d7ff00]/60">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              placeholder="Search name, muscle, equipment"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </label>
        </div>

        {loading && (
          <div className="grid min-h-64 place-items-center border border-white/10 bg-[#0f0f0f]">
            <div className="text-center">
              <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#d7ff00]" />
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-white/50">
                Loading workouts…
              </p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="border border-red-400/20 bg-red-500/5 p-6 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>

            {filteredWorkouts.length === 0 && (
              <div className="mt-6 border border-white/10 bg-[#111] p-10 text-center text-white/50">
                No workouts match your search.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
