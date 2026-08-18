"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FlexTend application error", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-red-200 bg-[#FCF8F2] p-8 text-center shadow-xl">
        <p className="text-sm font-extrabold uppercase tracking-widest text-red-600">Something went wrong</p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-[#032D22]">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4A5D56]">
          Please try again. If the problem continues, return to the clinic website and start over.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#064E3B] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#032D22]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[#064E3B]/25 px-6 py-3 text-sm font-bold text-[#064E3B] transition-colors hover:bg-[#064E3B]/10"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
