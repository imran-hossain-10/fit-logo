import type { Metadata } from "next";

import { Toaster } from "sonner";

import { FitLogProvider } from "@/context/FitLogContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion for planning and tracking workouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}
          <Toaster
            position="top-right"
            theme="dark"
            richColors
          />
        </FitLogProvider>
      </body>
    </html>
  );
}