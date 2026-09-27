"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "@/lib/api";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSavedWorkout: (id: number) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    const planData = localStorage.getItem("fitlog-plan");
    const savedData = localStorage.getItem("fitlog-saved");

    if (planData) {
      setPlan(JSON.parse(planData));
    }

    if (savedData) {
      setSaved(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    setPlan((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      if (current.length === 5) {
        return current;
      }

      return [...current, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) => current.filter((item) => item.id !== id));
  };

  const saveWorkout = (workout: Workout) => {
    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      return [...current, workout];
    });
  };

  const removeSavedWorkout = (id: number) => {
    setSaved((current) => current.filter((item) => item.id !== id));
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSavedWorkout,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}