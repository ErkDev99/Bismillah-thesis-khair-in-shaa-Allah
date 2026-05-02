export default function Loading() {
  return (
    <div
      className="min-h-screen bg-emerald-50 dark:bg-slate-950"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>

      {/* Hero band placeholder */}
      <section
        aria-hidden="true"
        className="relative bg-emerald-950 dark:bg-black overflow-hidden flex items-center justify-center min-h-[40vh] py-16 md:py-20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 px-4 max-w-3xl mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
            <div className="h-2.5 w-32 bg-emerald-500/30 rounded animate-pulse" />
            <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
          </div>
          <div className="h-10 md:h-14 w-3/4 mx-auto bg-emerald-500/20 rounded animate-pulse mb-4" />
          <div className="h-4 w-2/3 mx-auto bg-emerald-500/15 rounded animate-pulse" />
        </div>
      </section>

      {/* Content placeholder — generic 3-row block */}
      <section aria-hidden="true" className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-3 w-40 mx-auto bg-stone-200 dark:bg-slate-800 rounded animate-pulse mb-3" />
            <div className="h-7 md:h-9 w-1/2 mx-auto bg-stone-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl overflow-hidden"
              >
                <div className="aspect-[4/3] bg-stone-200 dark:bg-slate-800 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-stone-200 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-5 w-3/4 bg-stone-200 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-stone-200 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-stone-200 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
