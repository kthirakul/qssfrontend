import { Route, Routes } from 'react-router-dom'
import { Services } from './app.services'
import LayoutUi from './components/layout/layout.ui'
import ApprovedListUi from './pages/approved-list/approved-list.ui'
import CheckRequestDetailUi from './pages/check-request-detail/check-request-derail.ui'
import CheckRequestStatusUi from './pages/check-request-status/check-request-status.ui'
import CheckRequstUi from './pages/checl-request/check-request.ui'
import FindListUi from './pages/find-list/find-list.ui'
import HomeUi from './pages/home/home.ui'
import RequestDoc from './pages/request-doc/request-doc.ui'
import RequestListUi from './pages/request-list/request-list.ui'
const AppRoute: React.FC = () => {
  const services = Services()
  return services.user.currentUser ? (
    <LayoutUi>
      <Routes>
        <Route path='/request-list' element={<RequestListUi />} />
        <Route path='/approved-list' element={<ApprovedListUi />} />
        <Route path='/find-list' element={<FindListUi />} />
        <Route path='/request-doc/:id' element={<RequestDoc />} />
      </Routes>
    </LayoutUi>
  ) : (
    <LayoutUi>
      <Routes>
        <Route path='/' element={<HomeUi />} />
        <Route path='/check-request' element={<CheckRequstUi />} />
        <Route path='/check-request-detail' element={<CheckRequestDetailUi />} />
        <Route path='/check-request-status' element={<CheckRequestStatusUi />} />
        <Route path='/request-doc/:id' element={<RequestDoc />} />
      </Routes>
    </LayoutUi>
  )
}

export default AppRoute
