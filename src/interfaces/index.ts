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
}

export interface RequestDocData {
  orgData: OrgDoc | null
  docData: RequestData[]
}

export interface RequestDoc {
  [x: string]: RequestDocData
}

export enum StatusLogData {
  sendRequest = 'ส่งคำขอตรวจสอบวุฒิแล้ว',
  cancelRequest = 'ยกเลิกคำขอตรวจสอบวุฒิแล้ว',
  assistantAppove = 'คัดกรองคำขอตรวจสอบวุฒิแล้ว',
  assistantNoAppove = 'ไม่ผ่านการคัดกรอง',
  managerAppove = 'อนุมัติคำขอตรวจสอบวุฒิแล้ว',
  managerNoAppove = 'ไม่อนุมัติคำขอตรวจสอบวุฒิ',
}
