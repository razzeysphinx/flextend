import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-[#064E3B]/15 bg-[#FCF8F2] p-8 text-center shadow-xl">
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#C9A24B]">404</p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-[#032D22]">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4A5D56]">
          The page you requested is not available. Return to the FlexTend clinic website.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[#064E3B] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#032D22]"
        >
          Return to clinic website
        </Link>
      </div>
    </main>
  );
}
