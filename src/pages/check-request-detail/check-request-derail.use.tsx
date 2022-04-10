import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base'
import { SnackbarBase } from '@material/mwc-snackbar/mwc-snackbar-base'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
import { RequestDoc, StatusLogData, StudentData } from '../../interfaces'

const useCheckRequestDetail = () => {
  const navigate = useNavigate()
  const service = Services()
  const [loading, setLoading] = useState(false)

  const [studentList, setStudentList] = useState<StudentData[]>([])

  const snackbarRef = useRef<SnackbarBase | null>(null)

  const docNumber = useRef<HTMLInputElement | null>(null)
  const docTitle = useRef<HTMLInputElement | null>(null)
  const docNote = useRef<HTMLTextAreaElement | null>(null)

  const studentId = useRef<HTMLInputElement | null>(null)
  const studentName = useRef<HTMLInputElement | null>(null)

  const dialogRef = useRef<DialogBase>(null)
  const onBack = () => {
    navigate('/check-request', { replace: true })
  }

  const openAddStudentDialog = () => {
    // @ts-ignore
    dialogRef.current?.show()
  }

  const addStudent = () => {
    const data = studentList.concat({
      studentId: studentId.current?.value || '',
      studentName: studentName.current?.value || '',
    })

    // @ts-ignore
    studentId.current.value = ''
    // @ts-ignore
    studentName.current.value = ''

    setStudentList(data)
    snackbarRef.current?.show()
  }

  const saveRequestDoc = () => {
    setLoading(true)
    setTimeout(() => {
      const requestDoc =
        (JSON.parse(window.localStorage.getItem('request-doc') || 'null') as RequestDoc) || null

      const statusLog = [
        {
          createdAt: Date.now(),
          createdBy: service.docs.orgDoc?.poi,
          status: StatusLogData.sendRequest,
        },
      ]

      const docData = (requestDoc?.[service?.docs?.orgDoc?.poi as string]?.docData || []).concat({
        docNumber: docNumber.current?.value || '',
        docTitle: docTitle.current?.value || '',
        docNote: docNote.current?.value || '',
        studentData: studentList,
        statusLog,
      })

      const data: RequestDoc = {
        [service?.docs?.orgDoc?.poi as string]: {
          orgData: service.docs.orgDoc,
          docData: docData,
        },
      }

      if (service.docs.allDocs) {
        const newDocs = { ...service.docs.allDocs, ...data }
        window.localStorage.setItem('request-doc', JSON.stringify(newDocs))
      } else {
        window.localStorage.setItem('request-doc', JSON.stringify(data))
      }
      setLoading(false)
      navigate(`/request-doc/${docNumber.current?.value}`)
    }, 1000)
  }

  return {
    onBack,
    dialogRef,
    openAddStudentDialog,
    docNumber,
    docTitle,
    docNote,
    studentId,
    studentName,
    studentList,
    addStudent,
    snackbarRef,
    saveRequestDoc,
    loading,
  }
}

export default useCheckRequestDetail
