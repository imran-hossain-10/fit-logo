"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a0d] px-5 text-white">
      <section className="max-w-md text-center" aria-labelledby="error-title">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          FitLog
        </p>
        <h1 id="error-title" className="mt-3 text-3xl font-bold">
          Workouts could not load
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#858b96]">
          Please check your connection and try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-[#090a0d] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
