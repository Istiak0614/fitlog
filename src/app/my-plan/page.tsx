"use client";

import Link from "next/link";
import {useState,} from "react";
import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";

import {usePlan,} from "@/context/PlanContext";

type TabType =
  | "plan"
  | "saved";

type SortType =
  | "duration"
  | "calories"
  | "rating";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    metrics,
    isHydrated,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [
    activeTab,
    setActiveTab,
  ] = useState<TabType>("plan");

  const [
    sortBy,
    setSortBy,
  ] = useState<SortType>("duration");

  const currentList =
    activeTab === "plan"
      ? plan
      : saved;

  const sortedList = [
    ...currentList,
  ].sort((a, b) => {
    if (
      sortBy === "duration"
    ) {
      return (
        a.duration -
        b.duration
      );
    }

    if (
      sortBy === "calories"
    ) {
      return (
        b.caloriesBurned -
        a.caloriesBurned
      );
    }

    if (
      sortBy === "rating"
    ) {
      return (
        b.rating -
        a.rating
      );
    }

    return 0;
  });
  if (!isHydrated) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0d0f13]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#c8ff00]" />

        <p className="mt-3 text-xs text-white/50">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#0d0f13] text-white">
      <section className="mx-auto w-full max-w-[1184px] px-5 pb-10 pt-10 sm:px-6 lg:px-0">
        <div>
          <h1 className="text-[28px] font-black uppercase leading-none tracking-tight">
            My Plan
          </h1>

          <p className="mt-3 text-[12px] text-[#777b83]">
            Cap of five lifts for today.
            Finish them, then load more.
          </p>
        </div>
        <div className="mt-6 grid min-h-[114px] grid-cols-3 rounded-[14px] border border-[#242932] bg-[#14171d]">
          <div className="flex items-center px-6 sm:px-8">
            <div>
              <p className="text-[10px] text-[#747981]">
                Exercises
              </p>

              <p className="mt-2 text-[28px] font-black leading-none text-[#c8ff00]">
                {metrics.exercises}
              </p>
            </div>
          </div>
          <div className="relative flex items-center px-6 sm:px-8">
            <div className="absolute bottom-7 left-0 top-7 w-px bg-[#252a32]" />

            <div>
              <p className="text-[10px] text-[#747981]">
                Minutes
              </p>

              <p className="mt-2 text-[28px] font-black leading-none">
                {metrics.minutes}
              </p>
            </div>

            <div className="absolute bottom-7 right-0 top-7 w-px bg-[#252a32]" />
          </div>
          <div className="flex items-center px-6 sm:px-8">
            <div>
              <p className="text-[10px] text-[#747981]">
                Calories
              </p>

              <p className="mt-2 text-[28px] font-black leading-none">
                {metrics.calories}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex h-[38px] items-center rounded-[9px] border border-[#242932] bg-[#14171d] p-[3px]">
            <button
              type="button"
              onClick={() =>
                setActiveTab("plan")
              }
              className={`h-[30px] rounded-[6px] px-5 text-[10px] font-medium transition ${
                activeTab === "plan"
                  ? "bg-[#252b35] text-white"
                  : "text-[#656a72]"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("saved")
              }
              className={`h-[30px] rounded-[6px] px-5 text-[10px] font-medium transition ${
                activeTab === "saved"
                  ? "bg-[#252b35] text-white"
                  : "text-[#656a72]"
              }`}
            >
              Saved
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] text-[#686d75] sm:block">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortType
                  )
                }
                className="h-[36px] appearance-none rounded-[7px] border border-[#242932] bg-[#14171d] py-0 pl-4 pr-9 text-[10px] text-[#bec1c7] outline-none"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6d727a]"
              />
            </div>
          </div>
        </div>
        {sortedList.length === 0 && (
          <div className="mt-5 flex min-h-[276px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#252a31] px-5 text-center">

            <h2 className="text-[17px] font-black uppercase leading-none tracking-[0.02em]">
              Nothing Here Yet
            </h2>

            <p className="mt-3 text-[10px] text-[#777b82]">
              Browse the library and add
              a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 flex h-[34px] items-center justify-center rounded-full bg-[#c8ff00] px-6 text-[10px] font-bold text-black shadow-[0_5px_18px_rgba(200,255,0,0.15)] transition hover:bg-[#d8ff3e]"
            >
              Go to workouts
            </Link>
          </div>
        )}
        {sortedList.length > 0 && (
          <div className="mt-5 overflow-hidden rounded-[10px] border border-[#242932] bg-[#14171d]">
            {sortedList.map(
              (workout, index) => {
                const planWorkout =
                  activeTab === "plan"
                    ? plan.find((item) =>item.id === workout.id)
                    : undefined;

                return (
                  <div
                    key={workout.id}
                    className={`flex min-h-[114px] items-center gap-4 px-5 py-4 ${
                      index !==
                      sortedList.length - 1
                        ? "border-b border-[#292e37]"
                        : ""
                    } ${
                      planWorkout?.isDone
                        ? "opacity-60"
                        : ""
                    }`}
                  >
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-[74px] w-[132px] shrink-0 rounded-[7px] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-[14px] font-black uppercase leading-none tracking-[0.01em]">
                          {workout.name}
                        </h3>

                        {planWorkout?.isDone && (
                          <span className="rounded bg-[#c8ff00] px-2 py-[2px] text-[8px] font-black uppercase text-black">
                            Done
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-[10px] text-[#858a92]">
                        {workout.equipment}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-[9px] text-[#a0a4ab]">

                        <span className="flex items-center gap-[5px]">
                          <Clock3
                            size={11}
                            className="text-[#bfff00]"
                          />

                          {workout.duration}
                          {" "}
                          min
                        </span>

                        <span className="flex items-center gap-[5px]">
                          <Flame
                            size={11}
                            className="text-[#bfff00]"
                          />

                          {workout.caloriesBurned}
                          {" "}
                          kcal
                        </span>

                        <span className="flex items-center gap-[5px]">
                          <Star
                            size={11}
                            className="text-[#bfff00]"
                          />

                          {workout.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex h-[31px] items-center justify-center rounded-full border border-[#454b56] px-5 text-[9px] font-medium text-[#e0e2e5] transition hover:border-white/50"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" &&
                        !planWorkout?.isDone && (
                          <button
                            type="button"
                            onClick={() =>
                              markAsDone(
                                workout.id
                              )
                            }
                            className="flex h-[31px] items-center gap-2 rounded-full bg-[#c8ff00] px-5 text-[9px] font-bold text-black transition hover:bg-[#d5ff30]"
                          >
                            <Check
                              size={12}
                              strokeWidth={3}
                            />

                            Mark as Done
                          </button>
                        )}

                      <button
                        type="button"
                        aria-label="Remove workout"
                        onClick={() => {
                          if (
                            activeTab === "plan"
                          ) {
                            removeFromPlan(
                              workout.id
                            );
                          } else {
                            removeFromSaved(
                              workout.id
                            );
                          }
                        }}
                        className="flex h-7 w-7 items-center justify-center text-[#666b72] transition hover:text-white"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPlanPage;