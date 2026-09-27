"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "sonner";

import { useFitLog } from "@/context/FitLogContext";
import type { Workout } from "@/lib/api";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const { plan, saved, addToPlan, saveWorkout } = useFitLog();

  const alreadyInPlan = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);

  function handleAddToPlan() {
    if (alreadyInPlan) {
      toast.error("This workout is already in your plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.error("You can add a maximum of 5 workouts to your plan.");
      return;
    }

    addToPlan(workout);
    toast.success("Workout added to your plan.");
  }

  function handleSaveWorkout() {
    if (alreadySaved) {
      toast.error("This workout is already saved.");
      return;
    }

    saveWorkout(workout);
    toast.success("Workout saved.");
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        className="flex h-[60px] items-center gap-3 rounded-[14px] bg-[#C2F800] px-7 text-[16px] font-semibold text-[#090a0d] transition hover:brightness-105"
      >
        <CalendarPlus size={21} strokeWidth={2} />

        <span>
          {alreadyInPlan
            ? "Already in today's plan"
            : "Add to today's plan"}
        </span>
      </button>

      <button
        onClick={handleSaveWorkout}
        className="flex h-[60px] items-center gap-3 rounded-[14px] border border-[#343942] px-7 text-[16px] font-medium text-white transition hover:border-[#C2F800] hover:text-[#C2F800]"
      >
        <Bookmark size={21} strokeWidth={2} />

        <span>{alreadySaved ? "Saved" : "Save for later"}</span>
      </button>
    </div>
  );
}