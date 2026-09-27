import Image from "next/image";

import banner from "@/asset/banner.png";

export default function HeroSection() {
  return (
    <section className="mt-5 grid min-h-[300px] overflow-hidden rounded-lg border border-[#20242b] bg-[#15171c] lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-9">
        <p className="mb-3 text-[9px] font-bold uppercase tracking-wider text-[#C2F800]">
          Workout Library
        </p>

        <h1 className="max-w-[500px] font-[Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] text-4xl uppercase leading-[0.95] sm:text-5xl">
          Train With Intent.
          <br />
          Log Every Set.
        </h1>

        <p className="mt-4 max-w-[470px] text-[10px] leading-5 text-[#858b96]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-5 inline-flex w-fit rounded-md bg-[#C2F800] px-5 py-3 text-[10px] font-bold uppercase text-[#090a0d] transition hover:brightness-105"
        >
          Browse Workouts
        </a>
      </div>

      <div className="relative min-h-[240px] lg:min-h-[300px]">
        <Image
          src={banner}
          alt="Workout illustration"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain object-right px-8 py-10 lg:px-10 lg:py-12"
        />
      </div>
    </section>
  );
}