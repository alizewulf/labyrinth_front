import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <main className="flex flex-1 flex-col px-6 py-16 text-white sm:py-24">
      <Outlet />
    </main>
  )
}

export default Main
