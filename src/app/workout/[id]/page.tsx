"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  CalendarPlus,
} from "lucide-react";

import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import type { Workout } from "@/types";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface SpecRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const SpecRow = ({
  label,
  value,
  last = false,
}: SpecRowProps) => {
  return (
    <div
      className={`grid min-h-[53px] grid-cols-[150px_1fr] items-center px-5 ${
        last ? "" : "border-b border-white/[0.06]"
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
        {label}
      </span>

      <span className="text-right text-[11px] font-medium text-white/90">
        {value}
      </span>
    </div>
  );
};

const WorkoutDetailsPage = ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = use(params);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    plan,
    saved,
    addToPlan,
    addToSaved,
  } = usePlan();

  useEffect(() => {
    const loadWorkout = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkoutById(id);

        setWorkout(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workout.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#0b0e12]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d7ff00]" />

          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Loading workout...
          </p>
        </div>
      </section>
    );
  }

  if (error || !workout) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#0b0e12] px-4 text-center text-white">
        <div>
          <h1 className="text-3xl font-black uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-sm text-white/50">
            {error || "The requested workout could not be found."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#d7ff00] px-5 py-3 text-xs font-black uppercase text-black"
          >
            <ArrowLeft size={16} />
            Back to Workouts
          </Link>
        </div>
      </section>
    );
  }

  const isPlanFull = plan.length >= 5;

  const isAlreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isAlreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  return (
    <section className="bg-[#0b0e12] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-8 py-12 sm:px-10 lg:px-12 lg:py-[52px]">

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-[52px]">
          <div className="overflow-hidden rounded-xl">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-auto w-full rounded-xl object-cover lg:h-[735px]"
            />
          </div>
          <div className="w-full">
            <h1 className="display-font text-[30px] font-black uppercase leading-[1] text-white sm:text-[32px]">
              {workout.name}
            </h1>
            <p className="mt-3 max-w-[560px] text-[12px] leading-[1.6] text-white/50">
              {workout.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#d7ff00] px-3 py-[4px] text-[9px] font-black uppercase leading-none text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-lg border border-white/[0.07] bg-[#12161e]">
              <SpecRow
                label="Equipment"
                value={workout.equipment}
              />

              <SpecRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <SpecRow
                label="Sets"
                value={String(workout.sets)}
              />

              <SpecRow
                label="Reps"
                value={workout.reps}
              />

              <SpecRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow
                label="Rating"
                value={String(workout.rating)}
                last
              />
            </div>
            <div className="mt-7">
              <h2 className="text-[12px] font-black uppercase tracking-[0.04em] text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-[1px] w-3 shrink-0 text-[10px] text-white/45">
                        {index + 1}.
                      </span>

                      <p className="text-[11px] leading-[1.5] text-white/60">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                disabled={
                  isPlanFull ||
                  isAlreadyInPlan
                }
                className="flex h-[44px] items-center justify-center gap-2 rounded-md bg-[#d7ff00] px-5 text-[11px] font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
              >
                <CalendarPlus size={15} />

                {isAlreadyInPlan
                  ? "Already in Plan"
                  : isPlanFull
                    ? "Plan Full"
                    : "Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={() => addToSaved(workout)}
                disabled={isAlreadySaved}
                className="flex h-[44px] items-center justify-center gap-2 rounded-md border border-white/20 px-5 text-[11px] font-medium text-white/80 transition hover:border-[#d7ff00] hover:text-[#d7ff00] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Bookmark size={14} />

                {isAlreadySaved
                  ? "Already Saved"
                  : "Save for later"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;