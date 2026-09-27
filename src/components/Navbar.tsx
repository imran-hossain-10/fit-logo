"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/asset/logo.png";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutPage =
    pathname === "/" || pathname.startsWith("/workouts");

  const isPlanPage = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-[#242932] bg-[#090a0d]">
      <div className="flex h-[68px] items-center justify-between px-5 sm:px-8 lg:px-[50px]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog logo"
            width={30}
            height={30}
            priority
            className="h-[30px] w-[30px] object-contain"
          />

          <span className="text-[16px] font-bold text-white">
            FITLOG
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          <Link
            href="/#library"
            aria-current={isWorkoutPage ? "page" : undefined}
            className={`rounded-full px-5 py-2.5 text-[18px] transition ${
              isWorkoutPage
                ? "bg-[#1A2312] text-[#C2F800]"
                : "text-[#858b96] hover:text-[#C2F800]"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            aria-current={isPlanPage ? "page" : undefined}
            className={`rounded-full px-5 py-2.5 text-[18px] transition ${
              isPlanPage
                ? "bg-[#1A2312] text-[#C2F800]"
                : "text-[#858b96] hover:text-[#C2F800]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[18px] text-white"
          >
            <span className="hidden sm:inline">Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C2F800] px-1 text-[12px] font-bold text-[#090a0d]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[18px] text-white"
          >
            <span className="hidden sm:inline">Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#343942] px-1 text-[12px] text-[#858b96]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
