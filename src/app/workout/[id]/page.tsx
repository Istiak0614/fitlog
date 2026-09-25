"use client";

import Link from "next/link";
import {use, useEffect, useState,} from "react";
import {ArrowLeft, Bookmark, CalendarPlus, Clock3, Dumbbell, Flame, Star,} from "lucide-react";
import {usePlan,} from "@/context/PlanContext";
import {getWorkoutById,} from "@/utils/api";
import type {Workout,} from "@/types";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface SpecRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  last?: boolean;
}

const SpecRow = ({
  label,
  value,
  icon,
  last = false,
}: SpecRowProps) => {
  return (
    <div
      className={`grid grid-cols-[120px_1fr] items-center gap-4 px-4 py-4 sm:grid-cols-[160px_1fr] sm:px-5 ${
        last
          ? ""
          : "border-b border-white/10"
      }`}
    >
      <span className="text-xs font-black uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>

      <span className="flex items-center gap-2 text-sm font-bold">
        {icon && (
          <span className="text-[#d7ff00]">
            {icon}
          </span>
        )}

        {value}
      </span>
    </div>
  );
};

const WorkoutDetailsPage = ({
  params,
}: WorkoutDetailsPageProps) => {
  const {
    id,
  } = use(params);

  const [
    workout,
    setWorkout,
  ] = useState<Workout | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

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

        const data =
          await getWorkoutById(id);

        setWorkout(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load workout."
        );
      } finally {
        setLoading(false);
      }
    };

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#d7ff00]" />
          <p className="text-sm font-black uppercase tracking-widest text-white/40">
            Loading workout...
          </p>
        </div>
      </section>
    );
  }

  if (
    error ||
    !workout
  ) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#0a0a0a] px-4 text-center">
        <div>
          <h1 className="text-4xl font-black uppercase">
            Workout Not Found
          </h1>
          <p className="mt-4 text-white/50">
            {error ||
              "The requested workout could not be found."}
          </p>
          <Link href="/" className="mt-8 inline-flex items-center gap-2 bg-[#d7ff00] px-6 py-3 font-black uppercase text-black">
            <ArrowLeft size={18} />
            Back to Workouts
          </Link>
        </div>
      </section>
    );
  }

  const isPlanFull =
    plan.length >= 5;

  const isAlreadyInPlan =
    plan.some(
      (item) =>
        item.id === workout.id
    );

  const isAlreadySaved =
    saved.some(
      (item) =>
        item.id === workout.id
    );

  return (
    <section className="bg-[#0a0a0a] py-10 text-white lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase text-white/50 transition hover:text-[#d7ff00]"
        >
          <ArrowLeft size={18} />

          Back to Library
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden border border-white/10 bg-[#151515]">
            <img
              src={workout.image}
              alt={workout.name}
              className="min-h-[420px] w-full object-cover lg:min-h-[600px]"
            />
          </div>

          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map(
                (muscle) => (
                  <span
                    key={muscle}
                    className="border border-[#d7ff00]/40 bg-[#d7ff00]/5 px-3 py-1 text-xs font-black uppercase text-[#d7ff00]"
                  >
                    {muscle}
                  </span>
                )
              )}
            </div>

            <h1 className="text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-white/60">
              {workout.description}
            </p>

            <div className="mt-10">
              <h2 className="mb-4 border-l-4 border-[#d7ff00] pl-3 text-lg font-black uppercase">
                Key Specs
              </h2>

              <div className="border border-white/10 bg-[#111111]">
                <SpecRow
                  label="Equipment"
                  value={
                    workout.equipment
                  }
                />

                <SpecRow
                  label="Difficulty"
                  value={
                    workout.difficulty
                  }
                />

                <SpecRow
                  label="Sets"
                  value={String(
                    workout.sets
                  )}
                />

                <SpecRow
                  label="Reps"
                  value={
                    workout.reps
                  }
                />

                <SpecRow
                  label="Duration"
                  value={`${workout.duration} min`}
                  icon={
                    <Clock3 size={16} />
                  }
                />

                <SpecRow
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                  icon={
                    <Flame size={16} />
                  }
                />

                <SpecRow
                  label="Rating"
                  value={String(
                    workout.rating
                  )}
                  icon={
                    <Star size={16} />
                  }
                  last
                />
              </div>
            </div>
            <div className="mt-10">
              <h2 className="mb-5 border-l-4 border-[#d7ff00] pl-3 text-lg font-black uppercase">
                Instructions
              </h2>

              <ol className="space-y-4">
                {workout.instructions.map(
                  (
                    instruction,
                    index
                  ) => (
                    <li
                      key={index}
                      className="flex gap-4 border-b border-white/10 pb-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#d7ff00] text-sm font-black text-black">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-white/70">
                        {
                          instruction
                        }
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  addToPlan(
                    workout
                  )
                }
                disabled={
                  isPlanFull ||
                  isAlreadyInPlan
                }
                className="flex min-h-14 items-center justify-center gap-2 bg-[#d7ff00] px-5 text-sm font-black uppercase text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
              >
                <CalendarPlus
                  size={19}
                />

                {isAlreadyInPlan
                  ? "Already in Plan"
                  : isPlanFull
                    ? "Plan Full"
                    : "Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={() =>
                  addToSaved(
                    workout
                  )
                }
                disabled={
                  isAlreadySaved
                }
                className="flex min-h-14 items-center justify-center gap-2 border border-white/20 px-5 text-sm font-black uppercase transition hover:border-[#d7ff00] hover:text-[#d7ff00] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Bookmark
                  size={19}
                />

                {isAlreadySaved
                  ? "Already Saved"
                  : "Save for later"}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
              <Dumbbell size={15} />

              Today&apos;s plan:
              {" "}
              {plan.length}/5 workouts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;