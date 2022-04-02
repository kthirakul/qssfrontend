import { Route, Routes } from 'react-router-dom'
import HomeUi from './pages/home/home.ui'

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeUi />} />
    </Routes>
  )
}

export default AppRoute
