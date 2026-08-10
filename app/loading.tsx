/**
 * App-wide loading state, shown instantly during route transitions so a slow
 * page never leaves a blank window.
 */
export default function LoadingPage() {
  return (
    <div className="container-page section" aria-busy="true">
      <p className="sr-only">Loading…</p>
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="h-3 w-24 animate-pulse rounded-full bg-[#d9d2c3]" />
          <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-[#d9d2c3]" />
          <div className="h-5 w-1/2 animate-pulse rounded-xl bg-[#d9d2c3]/70" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-[26px] border border-[#d9d2c3] bg-white/70 p-5"
            />
          ))}
        </div>

        <div className="h-64 animate-pulse rounded-[30px] border border-[#d9d2c3] bg-white/70" />
      </div>
    </div>
  );
}