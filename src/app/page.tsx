import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkoutCard from "@/components/WorkoutCard";
import Footer from "@/components/Footer";
import { getWorkouts } from "@/lib/api";
export const dynamic = "force-dynamic";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#090a0d] text-white">
      <Navbar />

      <div className="mx-auto max-w-[1180px] px-4 pb-12 sm:px-5 lg:px-0">
        <HeroSection />

        <section id="library" className="scroll-mt-20 pt-12">
          <div className="mb-5">
            <h2 className="font-[Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] text-2xl uppercase text-white">
              The Library
            </h2>

            <p className="mt-1 text-[9px] text-[#858b96]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}