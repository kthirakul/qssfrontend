import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
import { ResultData, StatusLog, StatusLogData, StudentData } from '../../interfaces'
const useRequestDoc = () => {
  const navigate = useNavigate()
  const services = Services()

  const [currentStudent, setcurrentStudent] = useState<StudentData | null>(null)

  const [buttonLoading, setbuttonLoading] = useState(false)

  const [actionStudent, setActionStudent] = useState<'more-detail' | 'add-detail' | null>(null)

  const faculty = useRef<HTMLInputElement>(null)
  const edu_bg = useRef<HTMLInputElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const birthDate = useRef<HTMLInputElement>(null)
  const gradDate = useRef<HTMLInputElement>(null)
  const grade = useRef<HTMLInputElement>(null)

  const resultNumberRef = useRef<HTMLInputElement>(null)
  const resultDetailRef = useRef<HTMLTextAreaElement>(null)

  const [alignment, setAlignment] = useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  const dialogRef = useRef<DialogBase | null>(null)
  const dialogResultRef = useRef<DialogBase | null>(null)
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

  const findDoc = (student: StudentData, action: 'more-detail' | 'add-detail') => {
    setActionStudent(action)
    setcurrentStudent(student)
    dialogRef.current?.show()

    console.log('student', student)
    // @ts-ignore
    faculty.current.value = student?.studentDetail?.faculty || ''
    // @ts-ignore
    edu_bg.current.value = student?.studentDetail?.edu_bg || ''
    // @ts-ignore
    field.current.value = student?.studentDetail?.field || ''
    // @ts-ignore
    birthDate.current.value = student?.studentDetail?.birthDate || ''
    // @ts-ignore
    gradDate.current.value = student?.studentDetail?.gradDate || ''
    // @ts-ignore
    grade.current.value = student?.studentDetail?.grade || ''

    // @ts-ignore
    setAlignment(student?.studentDetail?.result || '')
  }

  const changeStatus = (statusLog: string) => {
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

        case 'eqs_registrar@gmail.com':
          window.location.href = '/checked-list'
          break
        default:
          break
      }
    }
  }
  const findDocDone = () => {
    changeStatus(StatusLogData.registrationFinished)
  }

  const reportResultDoc = () => {
    const data: ResultData = {
      resultNumber: resultNumberRef.current?.value,
      resultDetail: resultDetailRef.current?.value,
    }
    const newCurrentRequestDoc = { ...services.docs.currentRequestDoc }
    newCurrentRequestDoc.resultData = data

    // @ts-ignore
    services.docs.setCurrentRequestDoc(newCurrentRequestDoc)

    changeStatus(StatusLogData.assistantReported)
    dialogResultRef.current?.close()
  }

  const addCheckedData = () => {
    const data = {
      faculty: faculty.current?.value,
      edu_bg: edu_bg.current?.value,
      field: field.current?.value,
      birthDate: birthDate.current?.value,
      gradDate: gradDate.current?.value,
      grade: grade.current?.value,
      result: alignment,
    }

    const newCurrentRequestDoc = { ...services.docs.currentRequestDoc }
    const studentIndex = newCurrentRequestDoc.studentData?.findIndex(
      (res) => res.studentId === currentStudent?.studentId
    )

    // @ts-ignore
    newCurrentRequestDoc.studentData[studentIndex as number].studentDetail = data

    // @ts-ignore
    services.docs.setCurrentRequestDoc(newCurrentRequestDoc)

    // @ts-ignore
    if (newCurrentRequestDoc.statusLog[0].status !== 'กำลังดำเนินการตรวจสอบ') {
      changeStatus(StatusLogData.registrationProcessing)
    }

    dialogRef.current?.close()
  }

  const openSentResultDoc = () => {
    dialogResultRef.current?.show()
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
    handleChange,
    alignment,
    faculty,
    edu_bg,
    field,
    birthDate,
    gradDate,
    grade,
    addCheckedData,
    currentStudent,
    setcurrentStudent,
    findDocDone,
    openSentResultDoc,
    dialogResultRef,
    resultNumberRef,
    resultDetailRef,
    reportResultDoc,
    actionStudent,
    setActionStudent,
    buttonLoading,
  }
}

export default useRequestDoc
