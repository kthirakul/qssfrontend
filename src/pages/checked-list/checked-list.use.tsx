import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
import { RequestData, RequestDocData } from '../../interfaces'

const useCheckedList = () => {
  const servoces = Services()
  const navigate = useNavigate()
  const goto = (docAll: RequestDocData, doc: RequestData) => {
    servoces.docs.setCurrentRequestDoc(doc)
    servoces.docs.setorgAllData(docAll)
    setTimeout(() => {
      navigate(`/request-doc/${doc.docNumber}`, { replace: true })
    }, 200)
  }
  return { allDocs: Object.values(servoces.docs.allDocs || {}), servoces, goto }
}

export default useCheckedList
