import Image from "next/image";

import logo from "@/asset/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#20242b] bg-[#090a0d]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 py-7 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-0">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />

          <div>
            <p className="text-[11px] font-bold tracking-wide text-white">
              FITLOG
            </p>

            <p className="mt-1 text-[8px] text-[#858b96]">
              Train with intent. Log every set.
            </p>
          </div>
        </div>

        <p className="text-[8px] text-[#858b96]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}