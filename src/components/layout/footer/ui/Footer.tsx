function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-6 text-sm text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>© 2026 Lorem ipsum dolor sit amet.</p>
        <div className="flex gap-6">
          <a href="#rules" className="transition hover:text-slate-300">Lorem ipsum</a>
          <a href="#privacy" className="transition hover:text-slate-300">Dolor sit amet</a>
          <a href="mailto:hello@labyrinth.example" className="transition hover:text-slate-300">Consectetur elit</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
