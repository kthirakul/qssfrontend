import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
import { RequestData, RequestDocData } from '../../interfaces'

const useResultList = () => {
  const servoces = Services()

  const navigate = useNavigate()

  const dialogRef = useRef<DialogBase>(null)

  const goto = (docAll: RequestDocData, doc: RequestData) => {
    servoces.docs.setCurrentRequestDoc(doc)
    servoces.docs.setorgAllData(docAll)
    setTimeout(() => {
      navigate(`/request-doc/${doc.docNumber}`, { replace: true })
    }, 200)
  }
  return { allDocs: Object.values(servoces.docs.allDocs || {}), servoces, goto, dialogRef }
}

export default useResultList
