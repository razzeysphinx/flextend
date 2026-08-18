export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="h-10 w-10 rounded-full border-4 border-[#064E3B]/20 border-t-[#064E3B] animate-spin"
          aria-hidden="true"
        />
        <p className="text-sm font-semibold text-[#064E3B]">Loading FlexTend...</p>
      </div>
    </main>
  );
}
