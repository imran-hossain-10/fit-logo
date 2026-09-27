import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#090a0d] text-white">
      <Navbar />

      <section className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            FitLog
          </p>

          <h1 className="mt-3 font-[Impact,Arial_Narrow,sans-serif] text-7xl leading-none text-white sm:text-9xl">
            404
          </h1>

          <h2 className="mt-4 text-lg font-bold uppercase text-white">
            Workout Not Found
          </h2>

          <p className="mx-auto mt-2 max-w-[380px] text-[10px] leading-5 text-[#858b96]">
            The workout or page you are looking for does not exist or has
            already been moved.
          </p>

          <Link
            href="/#library"
            className="mt-6 inline-flex rounded-md bg-[#ccff00] px-5 py-3 text-[9px] font-bold uppercase text-[#090a0d] transition hover:brightness-105"
          >
            Back to Workout Library
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}