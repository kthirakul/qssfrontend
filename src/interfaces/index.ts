export interface UserLogin {
  email: string
  password: string
  name?: string
}

export interface OrgDoc {
  poi: string
  etc: string
  subdistrict: string
  district: string
  province: string
  postal_code: string
}

export interface StudentData {
  studentId: string
  studentName: string
  studentDetail?: StudentDetail
}

export interface StatusLog {
  createdAt: Date | string | number
  createdBy: string | undefined
  status: string
}

export interface RequestData {
  docNumber: string
  docTitle: string
  docNote: string
  studentData: StudentData[]
  statusLog: StatusLog[]
  resultData?: ResultData
}

export interface RequestDocData {
  orgData: OrgDoc | null
  docData: RequestData[]
}

export interface RequestDoc {
  [x: string]: RequestDocData
}

export interface StudentDetail {
  faculty: string | undefined
  edu_bg: string | undefined
  field: string | undefined
  birthDate: string | undefined
  gradDate: string | undefined
  grade: string | undefined
  result: string
}

export interface ResultData {
  resultNumber: string | undefined
  resultDetail: string | undefined
}

export enum StatusLogData {
  sendRequest = 'ส่งคำขอตรวจสอบวุฒิแล้ว',
  cancelRequest = 'ยกเลิกคำขอตรวจสอบวุฒิแล้ว',
  assistantAppove = 'คัดกรองคำขอตรวจสอบวุฒิแล้ว',
  assistantNoAppove = 'ไม่ผ่านการคัดกรอง',
  managerAppove = 'อนุมัติคำขอตรวจสอบวุฒิแล้ว',
  managerNoAppove = 'ไม่อนุมัติคำขอตรวจสอบวุฒิ',
  registrationProcessing = 'กำลังดำเนินการตรวจสอบ',
  registrationFinished = 'ตรวจสอบข้อมูลนักศึกษาแล้ว',
  registrarApprove = 'อนุมัติการตรวจสอบวุฒิแล้ว',
  registrarNoApprove = 'ไม่อนุมัติการตรวจสอบวุฒิ',
  assistantReported = 'รายงานผลการตรวจสอบวุฒิแล้ว',
}
