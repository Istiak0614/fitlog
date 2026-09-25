import type { Workout } from "@/types";

const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_BASE_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json() as Promise<Workout[]>;
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const response = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json() as Promise<Workout>;
}
