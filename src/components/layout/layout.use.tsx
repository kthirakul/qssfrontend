import { useLocation } from 'react-router-dom'
import { Services } from '../../app.services'
const useLayout = () => {
  const location = useLocation()
  const { route, user } = Services()
  const logout = () => {
    localStorage.removeItem('email')
    window.location.href = '/'
  }

  return {
    logout,
    route,
    user,
    pathname: location.pathname,
  }
}

export default useLayout
