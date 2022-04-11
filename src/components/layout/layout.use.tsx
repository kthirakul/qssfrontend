import { useLocation, useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
const useLayout = () => {
  const location = useLocation()
  const { route, user } = Services()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('email')
    window.location.href = '/'
  }

  const navbarGoto = (path: string) => {
    navigate(path, { replace: true })
    // window.location.href = path
  }

  return {
    logout,
    route,
    user,
    pathname: location.pathname,
    navbarGoto,
    currentUser: user.currentUser,
  }
}

export default useLayout
