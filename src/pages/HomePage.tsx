const stats = [
  { label: 'Lorem ipsum', value: '24' },
  { label: 'Dolor sit amet', value: '02:48' },
  { label: 'Consectetur elit', value: '1 284' },
]

const walls = new Set([1, 2, 4, 8, 10, 11, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 31, 32, 34, 36, 38, 39, 41, 43, 45, 46])

function HomePage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200">
          <span className="size-2 rounded-full bg-emerald-400" /> Lorem ipsum dolor sit amet
        </p>
        <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight sm:text-7xl">
          Lorem ipsum <span className="text-violet-400">dolor.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <button className="rounded-xl bg-violet-500 px-6 py-3.5 font-bold shadow-lg shadow-violet-950/40 transition hover:bg-violet-400">
            Lorem ipsum <span aria-hidden="true">→</span>
          </button>
          <button className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-white/5">
            Dolor sit amet
          </button>
        </div>
        <dl className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-slate-500 sm:text-sm">{label}</dt>
              <dd className="mt-2 text-lg font-bold sm:text-xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Lorem ipsum dolor" className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-5 rounded-4xl bg-violet-500/20 blur-3xl" />
        <div className="relative rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/40">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Lorem ipsum</p>
              <h2 className="mt-1 text-lg font-bold">Dolor sit amet</h2>
            </div>
            <span className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400">08</span>
          </div>
          <div className="grid aspect-square grid-cols-7 gap-1.5 rounded-2xl bg-slate-950 p-3" aria-hidden="true">
            {Array.from({ length: 49 }, (_, index) => {
              const isStart = index === 7
              const isExit = index === 41
              return (
                <span
                  key={index}
                  className={`rounded-md ${isStart ? 'bg-emerald-400 shadow-md shadow-emerald-400/40' : isExit ? 'bg-amber-300 shadow-md shadow-amber-300/40' : walls.has(index) ? 'bg-slate-700' : 'bg-slate-800/70'}`}
                />
              )
            })}
          </div>
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-slate-400">Lorem ipsum dolor</span>
            <span className="font-semibold text-amber-300">✦ 3</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
