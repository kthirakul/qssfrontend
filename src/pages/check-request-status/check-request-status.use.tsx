import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
import { RequestDoc } from '../../interfaces'

const useCheckRequestStatus = () => {
  const orgNameRef = useRef<HTMLInputElement | null>(null)
  const docNumber = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const service = Services()

  const checkRequestDoc = () => {
    const requestDocs: RequestDoc | null = JSON.parse(
      window.localStorage.getItem('request-doc') || 'null'
    )

    if (requestDocs) {
      //   // @ts-ignore
      const docDetail = requestDocs?.[orgNameRef.current?.value as string]
      service.docs.setorgAllData(docDetail)

      const findDoc = docDetail.docData.find((doc) => doc.docNumber === docNumber.current?.value)
      // @ts-ignore
      service.docs.setCurrentRequestDoc(findDoc)

      navigate(`/request-doc/${docNumber.current?.value}`, { replace: true })
    }
  }

  return {
    orgNameRef,
    docNumber,
    checkRequestDoc,
  }
}

export default useCheckRequestStatus
