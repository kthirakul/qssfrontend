import { createContext, useContext } from 'react'
import NumberService from './services/number.service'
import RouteService from './services/route.service'

const Context = createContext({})

const services = () => ({
  number: NumberService(),
  route: RouteService(),
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
