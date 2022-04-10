import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
import { StatusLog, StatusLogData } from '../../interfaces'
const useRequestDoc = () => {
  const navigate = useNavigate()
  const services = Services()

  const dialogRef = useRef<DialogBase | null>(null)
  const cencelDoc = () => {
    const status: StatusLog[] | undefined = services.docs.currentRequestDoc?.statusLog
      .concat({
        createdAt: Date.now(),
        createdBy: services.docs.orgAllData?.orgData?.poi,
        status: StatusLogData.cancelRequest,
      })
      // @ts-ignore
      .sort((a, b) => b.createdAt - a.createdAt)

    // @ts-ignore
    const newData = { ...services.docs.currentRequestDoc }
    newData.statusLog = status

    // @ts-ignore
    services.docs.setCurrentRequestDoc(newData)
  }

  const findDoc = () => {
    dialogRef.current?.show()
  }

  const changeStatus = (statusLog: string) => {
    console.log(
      'request-doc.use.js |services.user.currentUser?.name| = ',
      services.user.currentUser?.name
    )
    const status: StatusLog[] | undefined = services.docs.currentRequestDoc?.statusLog
      .concat({
        createdAt: Date.now(),
        createdBy: services.user.currentUser?.name,
        status: statusLog,
      })
      // @ts-ignore
      .sort((a, b) => b.createdAt - a.createdAt)

    // @ts-ignore
    const newData = { ...services.docs.currentRequestDoc }
    newData.statusLog = status

    // @ts-ignore
    services.docs.setCurrentRequestDoc(newData)
  }

  const switchRoute = (email: string | undefined) => {
    if (email) {
      switch (email) {
        case 'eqs_assistant@gmail.com':
          window.location.href = '/request-list'
          break

        case 'eqs_manager@gmail.com':
          window.location.href = '/approved-list'
          break

        case 'eqs_registration@gmail.com':
          window.location.href = '/find-list'
          break
        default:
          break
      }
    }
  }

  const goBack = () => {
    if (services.user.currentUser) {
      switchRoute(services.user.currentUser.email)
    } else {
      navigate('/check-request-status', { replace: true })
    }
  }
  return {
    requestDoc: services.docs.currentRequestDoc,
    orgData: services.docs.orgAllData?.orgData,
    services,
    cencelDoc,
    goBack,
    changeStatus,
    findDoc,
    dialogRef,
  }
}

export default useRequestDoc
