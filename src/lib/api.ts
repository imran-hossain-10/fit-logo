export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function fetchWorkouts(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function getWorkouts(): Promise<Workout[]> {
  for (const url of API_URLS) {
    try {
      return await fetchWorkouts(url);
    } catch {
      continue;
    }
  }

  throw new Error("Failed to fetch workouts");
}

export async function getWorkout(id: string): Promise<Workout> {
  for (const url of API_URLS) {
    try {
      return await fetchWorkouts(`${url}/${id}`);
    } catch {
      continue;
    }
  }

  throw new Error("Workout not found");
}
