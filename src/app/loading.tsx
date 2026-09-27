export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a0d]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#30343c] border-t-[#C2F800]" />

        <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-[#858b96]">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}