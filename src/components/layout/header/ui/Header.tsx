const navigation = ['Lorem ipsum', 'Dolor sit amet', 'Consectetur elit']

function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#home" className="flex items-center gap-3" aria-label="Lorem ipsum dolor">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-500 text-xl font-black shadow-lg shadow-violet-950/50">
            L
          </span>
          <span className="text-lg font-bold tracking-wide">Lorem ipsum</span>
        </a>

        <nav aria-label="Lorem ipsum navigation" className="hidden items-center gap-8 text-sm text-slate-300 sm:flex">
          {navigation.map((item) => (
            <a key={item} href="#" className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>

        <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-violet-400 hover:bg-white/5">
          Lorem ipsum
        </button>
      </div>
    </header>
  )
}

export default Header
