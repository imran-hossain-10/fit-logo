"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFitLog } from "@/context/FitLogContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeSavedWorkout } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [completed, setCompleted] = useState<number[]>([]);

  const workouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];

    if (sortBy === "duration") {
      return list.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    return list.sort((a, b) => b.rating - a.rating);
  }, [workouts, sortBy]);

  const totalDuration = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  function markAsDone(id: number) {
    setCompleted((current) => {
      if (current.includes(id)) {
        toast("Workout marked as active");
        return current.filter((item) => item !== id);
      }

      toast.success("Workout completed");
      return [...current, id];
    });
  }

  function removeWorkout(id: number) {
    if (activeTab === "plan") {
      removeFromPlan(id);

      setCompleted((current) =>
        current.filter((item) => item !== id),
      );

      toast.success("Workout removed from your plan");
      return;
    }

    removeSavedWorkout(id);
    toast.success("Workout removed from saved");
  }

  return (
    <main className="min-h-screen bg-[#090A0D] text-white">
      <Navbar />

      <div className="w-full px-5 pb-16 pt-12 sm:px-8 lg:px-[50px]">
        <section>
          <h1 className="font-[Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] text-[38px] uppercase leading-none sm:text-[44px]">
            My Plan
          </h1>

          <p className="mt-3 text-[13px] text-[#858B96]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        <section className="mt-9 grid overflow-hidden rounded-[15px] border border-[#232732] bg-[#14171E] md:grid-cols-3">
          <div className="border-b border-[#232732] px-7 py-7 md:border-b-0 md:border-r">
            <p className="text-[12px] text-[#858B96]">
              Exercises
            </p>

            <p className="mt-3 text-[42px] font-bold leading-none text-[#CCFF00]">
              {plan.length}
            </p>
          </div>

          <div className="border-b border-[#232732] px-7 py-7 md:border-b-0 md:border-r">
            <p className="text-[12px] text-[#858B96]">
              Minutes
            </p>

            <p className="mt-3 text-[42px] font-bold leading-none text-white">
              {totalDuration}
            </p>
          </div>

          <div className="px-7 py-7">
            <p className="text-[12px] text-[#858B96]">
              Calories
            </p>

            <p className="mt-3 text-[42px] font-bold leading-none text-white">
              {totalCalories}
            </p>
          </div>
        </section>

        <section className="mt-8 flex items-center justify-between gap-4">
          <div className="flex rounded-[10px] border border-[#232732] bg-[#14171E] p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-[8px] px-7 py-3 text-[17px] transition ${
                activeTab === "plan"
                  ? "bg-[#1A2312] text-[#C2F800]"
                  : "text-[#858B96] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-[8px] px-7 py-3 text-[17px] transition ${
                activeTab === "saved"
                  ? "bg-[#1A2312] text-[#C2F800]"
                  : "text-[#858B96] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-3 text-[12px] text-[#858B96]">
            <span className="hidden sm:block">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="h-[40px] rounded-[8px] border border-[#232732] bg-[#14171E] px-3 text-[12px] text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </section>

        <section className="mt-7">
          {sortedWorkouts.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-[12px] border border-dashed border-[#232732] bg-[#0F1115]">
              <div className="text-center">
                <h2 className="font-[Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] text-[22px] uppercase text-white">
                  Nothing Here Yet
                </h2>

                <p className="mt-2 text-[11px] text-[#858B96]">
                  Browse the library and add a lift to get today moving.
                </p>

                <Link
                  href="/#library"
                  className="mt-5 inline-flex rounded-full bg-[#CCFF00] px-6 py-3 text-[11px] font-bold uppercase text-[#090A0D] transition hover:brightness-105"
                >
                  Go to workouts
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedWorkouts.map((workout) => {
                const isCompleted = completed.includes(workout.id);

                return (
                  <article
                    key={workout.id}
                    className={`flex h-[90px] items-center gap-3 rounded-[10px] border bg-[#14171E] px-3 ${
                      isCompleted
                        ? "border-[#CCFF00]/40"
                        : "border-[#232732]"
                    }`}
                  >
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="relative h-[66px] w-[112px] shrink-0 overflow-hidden rounded-[5px]"
                    >
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link href={`/workouts/${workout.id}`}>
                        <h2
                          className={`truncate text-[13px] font-bold uppercase ${
                            isCompleted
                              ? "text-[#858B96] line-through"
                              : "text-white"
                          }`}
                        >
                          {workout.name}
                        </h2>
                      </Link>

                      <p className="mt-0.5 truncate text-[9px] text-[#858B96]">
                        {workout.equipment}
                      </p>

                      <div className="mt-2 flex items-center gap-4 text-[15px]">
                        <span className="flex items-center gap-1.5 text-[#D1D5DB]">
                          <span className="text-[#CCFF00]">
                            ◷
                          </span>
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1.5 text-[#D1D5DB]">
                          <span className="text-[#CCFF00]">
                            ♦
                          </span>
                          {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1.5 text-[#D1D5DB]">
                          <span className="text-[#CCFF00]">
                            ☆
                          </span>
                          {workout.rating}
                        </span>
                      </div>
                    </div>

                    <div className="hidden shrink-0 items-center gap-2 md:flex">
                      <Link
                        href={`/workouts/${workout.id}`}
                        className="flex h-[28px] items-center rounded-full border border-[#343942] px-4 text-[8px] text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          onClick={() => markAsDone(workout.id)}
                          className={`flex h-[28px] items-center rounded-full px-4 text-[8px] font-bold ${
                            isCompleted
                              ? "bg-[#1A2312] text-[#C2F800]"
                              : "bg-[#CCFF00] text-[#090A0D]"
                          }`}
                        >
                          {isCompleted
                            ? "Done"
                            : "✓ Mark as Done"}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => removeWorkout(workout.id)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center text-[15px] text-[#858B96] transition hover:text-red-400"
                      aria-label={`Remove ${workout.name}`}
                    >
                      ×
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}