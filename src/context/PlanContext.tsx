"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import type { PlanWorkout, Workout } from "@/types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];
  isHydrated: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
}

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) setPlan(JSON.parse(storedPlan) as PlanWorkout[]);
      if (storedSaved) setSaved(JSON.parse(storedSaved) as Workout[]);
    } catch {
      localStorage.removeItem("fitlog-plan");
      localStorage.removeItem("fitlog-saved");
      toast.error("Saved FitLog data was reset because it could not be read.");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, isHydrated]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("Today's plan is full! Maximum 5 workouts.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("This workout is already in today's plan.");
      return;
    }

    setPlan((previous) => [
      ...previous,
      {
        ...workout,
        isDone: false,
      },
    ]);
    toast.success(`${workout.name} added to today's plan!`);
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("This workout is already saved.");
      return;
    }

    setSaved((previous) => [...previous, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

  const removeFromPlan = (id: number) => {
    setPlan((previous) => previous.filter((item) => item.id !== id));
    toast.success("Removed from today's plan.");
  };

  const removeFromSaved = (id: number) => {
    setSaved((previous) => previous.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts.");
  };

  const markAsDone = (id: number) => {
    setPlan((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, isDone: true } : item,
      ),
    );
    toast.success("Workout done! Great job!");
  };

  const metrics = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((total, item) => total + item.duration, 0),
      calories: plan.reduce(
        (total, item) => total + item.caloriesBurned,
        0,
      ),
    }),
    [plan],
  );

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        isHydrated,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        metrics,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
}
