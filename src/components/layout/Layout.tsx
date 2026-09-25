import Footer from './footer/ui/Footer'
import Header from './header/ui/Header'
import Main from './main/ui/Main'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Layout
