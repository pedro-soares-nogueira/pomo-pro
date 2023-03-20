import { Timer, Scroll } from 'phosphor-react'
import { NavLink, Outlet } from 'react-router-dom'
import { HeaderContainer, LayoutContainer } from './styles'
import logo from '../../../assets/logo.png'

const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <div>
        <HeaderContainer>
          <span>
            <img src={logo} alt="" />
          </span>
          <nav>
            <NavLink to="/" title="Timer">
              <Timer size={24} />
            </NavLink>
            <NavLink to="/history" title="Histórico">
              <Scroll size={24} />
            </NavLink>
          </nav>
        </HeaderContainer>
        <Outlet />
      </div>
    </LayoutContainer>
  )
}

export default DefaultLayout
