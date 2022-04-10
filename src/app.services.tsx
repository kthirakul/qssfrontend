import { createContext, useContext } from 'react'
import DayService from './services/day.service'
import DocsService from './services/docs.service'
import NumberService from './services/number.service'
import RouteService from './services/route.service'
import UsersServices from './services/users.services'

const Context = createContext({})

const services = () => ({
  number: NumberService(),
  route: RouteService(),
  user: UsersServices(),
  docs: DocsService(),
  day: DayService(),
})

const AppServices: React.FC = ({ children }) => {
  return (
    <Context.Provider
      value={{
        ...services(),
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppServices

export const Services = () => useContext(Context) as ReturnType<typeof services>
