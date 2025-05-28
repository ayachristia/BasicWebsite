import Navigation from './components/Navigation'
import { Outlet } from 'react-router'

function Layout() {

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        < Outlet/>
      </main>

      <footer>
      </footer>
    </>
  )
}

export default Layout
