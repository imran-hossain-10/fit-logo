import Image from "next/image";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWorkout } from "@/lib/api";

import WorkoutActions from "./WorkoutActions";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#090A0D] text-white">
      <Navbar />

      <div className="w-full px-5 py-8 sm:px-8 lg:px-[35px]">
        <section className="grid overflow-hidden rounded-[10px] border border-[#232732] bg-[#111318] lg:grid-cols-2">
          <div className="relative h-[360px] sm:h-[500px] lg:h-[620px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#C2F800] px-3 py-1 text-[9px] font-bold uppercase text-[#090A0D]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="mt-8 font-[Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] text-[42px] uppercase leading-[0.92] text-white sm:text-[50px] lg:text-[58px]">
              {workout.name}
            </h1>

            <p className="mt-7 max-w-[700px] text-[12px] leading-6 text-[#858B96] sm:text-[13px]">
              {workout.description}
            </p>

            <div className="mt-9 overflow-hidden rounded-[12px] border border-[#232732] bg-[#14171E]">
              <div className="flex items-center justify-between border-b border-[#232732] px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Equipment
                </span>

                <span className="text-[12px] text-white">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#232732] px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Difficulty
                </span>

                <span className="text-[12px] text-white">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#232732] px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Sets
                </span>

                <span className="text-[12px] text-white">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#232732] px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Reps
                </span>

                <span className="text-[12px] text-white">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#232732] px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Duration
                </span>

                <span className="text-[12px] text-white">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#232732] px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Calories
                </span>

                <span className="text-[12px] text-white">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-[11px] font-semibold uppercase text-[#858B96]">
                  Rating
                </span>

                <span className="text-[12px] text-white">
                  {workout.rating}
                </span>
              </div>
            </div>

            <div className="mt-9 border-t border-[#232732] pt-8">
              <h2 className="text-[16px] font-bold uppercase text-white">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${index}-${instruction}`}
                    className="flex gap-3 text-[10px] leading-5 text-[#858B96] sm:text-[11px]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A2312] text-[9px] font-bold text-[#C2F800]">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}