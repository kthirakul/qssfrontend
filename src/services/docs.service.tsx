import { useEffect, useState } from 'react'
import { OrgDoc, RequestData, RequestDoc, RequestDocData } from '../interfaces'

const DocsService = () => {
  const [orgDoc, setOrgDoc] = useState<OrgDoc | null>(null)
  const [orgAllData, setorgAllData] = useState<RequestDocData | null>(null)
  const [currentRequestDoc, setCurrentRequestDoc] = useState<RequestData | null>(null)

  const [allDocs, setAllDocs] = useState<RequestDoc | null>(null)

  const getRequestDoc = (requestDoc: OrgDoc) => {
    setOrgDoc(requestDoc)
  }

  useEffect(() => {
    console.log('docs.service.js |orgAllData| = ', orgAllData)
  }, [orgAllData])

  useEffect(() => {
    const loadDocs = JSON.parse(window.localStorage.getItem('request-doc') || 'null') as RequestDoc

    if (loadDocs) {
      setAllDocs(loadDocs)
    }
  }, [])

  useEffect(() => {
    if (allDocs) {
      window.localStorage.setItem('request-doc', JSON.stringify(allDocs))
    }
  }, [allDocs])

  useEffect(() => {
    if (allDocs && currentRequestDoc) {
      console.log('docs.service.js |123| = ', 123)
      const newAllDodcs = { ...allDocs }
      const docIndex = newAllDodcs?.[orgAllData?.orgData?.poi as string]?.docData?.findIndex(
        (res) => res.docNumber === currentRequestDoc?.docNumber
      )

      const newOrgData = { ...orgAllData }
      console.log('docs.service.js |newOrgData| = ', newOrgData)
      // @ts-ignore
      newOrgData.docData[docIndex] = currentRequestDoc

      // @ts-ignore
      newAllDodcs[orgAllData.orgData.poi] = newOrgData

      setAllDocs(newAllDodcs)

      // newOrgData.docData[docIndex] = currentRequestDoc
    }
  }, [currentRequestDoc])

  return {
    orgDoc,
    setOrgDoc,
    getRequestDoc,
    orgAllData,
    setorgAllData,
    currentRequestDoc,
    setCurrentRequestDoc,
    allDocs,
    setAllDocs,
  }
}

export default DocsService
