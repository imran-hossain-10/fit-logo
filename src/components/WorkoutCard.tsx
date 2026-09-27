import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/lib/api";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      aria-label={`View ${workout.name} workout details`}
      className="group block overflow-hidden rounded-lg border border-[#20242b] bg-[#111318] transition hover:border-[#3b424d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]"
    >
      <div className="relative h-[210px] overflow-hidden bg-[#15181e] sm:h-[220px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1">
          {workout.muscleGroups.slice(0, 2).map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#C2F800] px-2.5 py-1 text-[8px] font-bold uppercase text-[#090a0d]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-[15px] font-bold uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-[10px] text-[#858b96]">
          {workout.equipment}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-[#20242b] pt-3 text-[9px] text-[#858b96]">
          <span>◷ {workout.duration} min</span>
          <span>♦ {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
