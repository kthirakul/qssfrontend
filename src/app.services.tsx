import { createContext, useContext } from 'react'
import NumberService from './services/number.service'

const Context = createContext({})

const services = () => ({
  number: NumberService(),
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

type ServicesType = ReturnType<typeof services>
export const Services = () => useContext(Context) as ServicesType
