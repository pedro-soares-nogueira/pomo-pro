import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div>
      <nav>Header</nav>
      <Outlet />
    </div>
  )
}

export default DefaultLayout
