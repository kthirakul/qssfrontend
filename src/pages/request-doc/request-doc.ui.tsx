import ToggleButton from '@mui/material/ToggleButton/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup'
import { StatusLogData } from '../../interfaces'
import useRequestDoc from './request-doc.use'

const RequestDoc: React.FC = () => {
  const hook = useRequestDoc()

  return hook.requestDoc ? (
    <>
      <div className='relative w-full h-full flex gap-y-12 justify-center items-center gap-x-16'>
        {/* {hook.requestDoc?.statusLog[hook.requestDoc?.statusLog.length - 1]} */}

        <div
          className='absolute top-6 left-6 border-2 border-gray-400 p-2 rounded-2xl flex gap-x-2 cursor-pointer'
          onClick={hook.goBack}
        >
          <mwc-icon>arrow_back</mwc-icon>
          <span>ย้อนกลับ</span>
        </div>

        {/* หน่วยงานภายนอก */}
        {!hook.services.user.currentUser &&
        hook.requestDoc?.statusLog[0].status !== 'ยกเลิกคำขอตรวจสอบวุฒิแล้ว' &&
        !(hook.requestDoc?.statusLog.length > 1) ? (
          <button
            onClick={hook.cencelDoc}
            className=' absolute right-6 top-6 p-4 bg-red-500 text-white rounded-md'
          >
            ยกเลิกคำขอ
          </button>
        ) : null}

        {/* ฝ่ายธุรการ */}
        {hook.services.user.currentUser?.email === 'eqs_assistant@gmail.com' &&
        !hook.services.docs.currentRequestDoc?.statusLog.some(
          (res) => res.status === 'ไม่ผ่านการคัดกรอง' || res.status === 'คัดกรองคำขอตรวจสอบวุฒิแล้ว'
        ) ? (
          <div className='flex gap-x-4 absolute right-6 top-6'>
            <button
              onClick={() => hook.changeStatus(StatusLogData.assistantNoAppove)}
              className=' p-4 bg-red-500 text-white rounded-md'
            >
              {hook.buttonLoading ? (
                <mwc-circular-progress Indeterminate></mwc-circular-progress>
              ) : (
                'ไม่อนุมัติ'
              )}
            </button>
            <button
              onClick={() => hook.changeStatus(StatusLogData.assistantAppove)}
              className='  p-4 bg-blue-500 text-white rounded-md'
            >
              {hook.buttonLoading ? (
                <mwc-circular-progress Indeterminate></mwc-circular-progress>
              ) : (
                'อนุมัติ'
              )}
            </button>
          </div>
        ) : null}

        {/* ฝ่ายธุรการ */}
        {hook.services.user.currentUser?.email === 'eqs_assistant@gmail.com' &&
        hook.services.docs.currentRequestDoc?.statusLog[0].status ===
          'อนุมัติการตรวจสอบวุฒิแล้ว' ? (
          <div className='flex gap-x-4 absolute right-6 top-6'>
            <button
              onClick={() => hook.openSentResultDoc()}
              className='  p-4 bg-blue-500 text-white rounded-md'
            >
              รายงานผล
            </button>
          </div>
        ) : null}

        {/* หัวหน้าฝ่าย */}
        {hook.services.user.currentUser?.email === 'eqs_manager@gmail.com' &&
        !hook.services.docs.currentRequestDoc?.statusLog.some(
          (res) =>
            res.status === 'อนุมัติคำขอตรวจสอบวุฒิแล้ว' ||
            res.status === 'ไม่อนุมัติคำขอตรวจสอบวุฒิ'
        ) ? (
          <div className='flex gap-x-4 absolute right-6 top-6'>
            <button
              onClick={() => hook.changeStatus(StatusLogData.managerNoAppove)}
              className=' p-4 bg-red-500 text-white rounded-md'
            >
              ไม่อนุมัติ
            </button>
            <button
              onClick={() => hook.changeStatus(StatusLogData.managerAppove)}
              className='  p-4 bg-blue-500 text-white rounded-md'
            >
              อนุมัติ
            </button>
          </div>
        ) : null}

        {/* ฝ่ายทะเบียน */}
        {hook.services.user.currentUser?.email === 'eqs_registration@gmail.com' &&
        hook.services.docs.currentRequestDoc?.statusLog[0].status !==
          'ตรวจสอบข้อมูลนักศึกษาแล้ว' ? (
          <div className='flex gap-x-4 absolute right-6 top-6'>
            <button onClick={hook.findDocDone} className=' p-4 bg-red-500 text-white rounded-md'>
              เสร็จสิ้น
            </button>
          </div>
        ) : null}

        {/* นายทะเบียน */}
        {hook.services.user.currentUser?.email === 'eqs_registrar@gmail.com' &&
        !hook.services.docs.currentRequestDoc?.statusLog.some(
          (res) =>
            res.status === 'อนุมัติการตรวจสอบวุฒิแล้ว' || res.status === 'ไม่อนุมัติการตรวจสอบวุฒิ'
        ) ? (
          <div className='flex gap-x-4 absolute right-6 top-6'>
            <button
              onClick={() => hook.changeStatus(StatusLogData.registrarNoApprove)}
              className=' p-4 bg-red-500 text-white rounded-md'
            >
              ไม่อนุมัติ
            </button>
            <button
              onClick={() => hook.changeStatus(StatusLogData.registrarApprove)}
              className='  p-4 bg-blue-500 text-white rounded-md'
            >
              อนุมัติ
            </button>
          </div>
        ) : null}

        <div
          style={{ maxWidth: 588 }}
          className='p-12 px-18 bg-white shadow-xl rounded-xl flex flex-col gap-y-8'
        >
          <div className=' text-2xl font-semibold text-indigo-900 text-center'>
            หนังสือเลขที่: {hook.requestDoc?.docNumber}
          </div>
          <div>
            <div className='text-lg font-semibold text-gray-700'>เรื่อง</div>
            <div>{hook.requestDoc?.docTitle}</div>
            <div>
              สร้างเมื่อ:{' '}
              {hook.services.day.longNameWithTime(
                hook.requestDoc?.statusLog[hook.requestDoc?.statusLog.length - 1].createdAt!
              )}{' '}
              น.
            </div>

            <div>หมายเหตุ: {hook.requestDoc?.docNote || '-'}</div>
          </div>

          <div>
            <div className='text-lg font-semibold text-gray-700'>หน่วยงาน</div>
            <div>{hook.orgData?.poi}</div>
            <div>ที่อยู่ {hook.orgData?.etc}</div>
          </div>

          <div>
            <div className='text-lg font-semibold text-gray-700 mb-2'>รายชื่อนักศึกษา</div>

            <div className='flex flex-col gap-y-1'>
              {hook.requestDoc?.studentData.map((student, index) => (
                <div key={index} className='flex gap-x-8'>
                  <div style={{ width: 240 }} className='flex gap-x-2 items-center'>
                    {console.log(student.studentDetail)}
                    <mwc-icon>
                      {student.studentDetail
                        ? student.studentDetail.result === 'สำเร็จ'
                          ? 'check_circle_outline'
                          : 'highlight_off'
                        : 'hourglass_empty'}
                    </mwc-icon>
                    <span>รหัสนักศึกษา</span>

                    {student.studentId}
                  </div>
                  <div style={{ width: 160 }}>{student.studentName}</div>
                  <div
                    hidden={
                      hook.services.user.currentUser?.email !== 'eqs_registration@gmail.com' ||
                      hook.services.docs.currentRequestDoc?.statusLog[0].status ===
                        'ตรวจสอบข้อมูลนักศึกษาแล้ว'
                    }
                    onClick={() => hook.findDoc(student, 'add-detail')}
                    className='border-2 border-blue-400 rounded-full text-blue-600 px-2 cursor-pointer'
                  >
                    ตรวจสอบ
                  </div>

                  {hook.services.docs.currentRequestDoc?.statusLog?.some(
                    (res) => res.status === 'ตรวจสอบข้อมูลนักศึกษาแล้ว'
                  ) && (
                    <div
                      onClick={() => hook.findDoc(student, 'more-detail')}
                      className='border-2 border-blue-400 rounded-full text-blue-600 px-2 cursor-pointer'
                    >
                      รายละเอียด
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='py-8 px-10 bg-white shadow-xl rounded-xl'>
          <div className='text-2xl font-semibold'>สถานะ</div>
          <div className='mt-8'>
            <div className='flex flex-col gap-y-6'>
              {hook.requestDoc?.statusLog.map((status, index) => (
                <div key={index} className='flex gap-x-4 items-center relative'>
                  <div>
                    <div>{hook.services.day.shortName(status.createdAt!)}</div>
                    <div>{hook.services.day.time(status.createdAt!)} น.</div>
                  </div>
                  <div className='dot-timeline'></div>
                  <div
                    // @ts-ignore
                    hidden={index === hook.requestDoc?.statusLog.length - 1}
                    className='line-timeline'
                  ></div>

                  <div>
                    <div className='flex gap-x-4'>
                      <span>สถานะ:</span>
                      <span className=' text-blue-700'>{status.status}</span>
                    </div>
                    <div className='flex'>
                      <div style={{ minWidth: 66 }}>โดย:</div>
                      <div style={{ maxWidth: 318 }} className=' text-blue-700'>
                        {status.createdBy}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <mwc-dialog ref={hook.dialogRef}>
        <div
          style={{
            fontFamily: 'Sarabun',
            pointerEvents: hook.actionStudent === 'add-detail' ? 'auto' : 'none',
          }}
          className='flex flex-col gap-y-4 p-2'
        >
          <div className='flex gap-x-4 justify-evenly mb-4'>
            <div className='text-xl font-semibold text-gray-500'>
              รหัส: {hook.currentStudent?.studentId}
            </div>
            <div className='text-xl font-semibold text-gray-500'>
              ชื่อ: {hook.currentStudent?.studentName}
            </div>
          </div>
          <div className='flex'>
            <div className=' w-28'>คณะ</div>
            <input
              ref={hook.faculty}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>
          <div className='flex'>
            <div className=' w-28'>วุฒิการศึกษา</div>
            <input
              ref={hook.edu_bg}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>

          <div className='flex'>
            <div className=' w-28'>สาขาวิชา</div>
            <input
              ref={hook.field}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>

          <div className='flex'>
            <div className=' w-28'>วันเกิด</div>
            <input
              ref={hook.birthDate}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>

          <div className='flex'>
            <div className=' w-28'>วันที่จบการศึกษา</div>
            <input
              ref={hook.gradDate}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>

          <div className='flex'>
            <div className=' w-28'>เกรด</div>
            <input
              ref={hook.grade}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>

          <div className='flex'>
            <div className=' w-28'>ผล</div>
            <ToggleButtonGroup
              color='primary'
              value={hook.alignment}
              exclusive
              onChange={hook.handleChange}
            >
              <ToggleButton value='สำเร็จ'>
                <div style={{ fontFamily: 'Sarabun' }}>สำเร็จ</div>
              </ToggleButton>
              <ToggleButton value='ไม่สำเร็จ'>
                <div style={{ fontFamily: 'Sarabun' }}>ไม่สำเร็จ</div>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        {hook.actionStudent === 'add-detail' ? (
          <>
            <mwc-button slot='secondaryAction' dialogAction='cancel'>
              <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
                กลับ
              </div>
            </mwc-button>
            <mwc-button slot='primaryAction' raised onClick={hook.addCheckedData}>
              <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
                เพิ่มข้อมูลตรวจสอบ
              </div>
            </mwc-button>
          </>
        ) : null}
      </mwc-dialog>
      <mwc-dialog ref={hook.dialogResultRef}>
        <div style={{ fontFamily: 'Sarabun' }} className='p-2'>
          <div className='flex flex-col gap-y-4'>
            <div className='text-semibold text-2xl mb-6 text-center text-gray-700'>
              รายงานผลการตรวจสอบวุฒิ
            </div>

            <div className='flex'>
              <div className=' w-36 text-gray-700'>หนังสือรายงานผลเลขที่</div>
              <input
                ref={hook.resultNumberRef}
                className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
                type='text'
              />
            </div>

            <div className='flex'>
              <div className=' w-36 text-gray-700'>รายละเอียด</div>
              <textarea
                ref={hook.resultDetailRef}
                className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              />
            </div>
          </div>
        </div>

        <mwc-button slot='primaryAction' raised onClick={hook.reportResultDoc}>
          <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
            รายงานผล
          </div>
        </mwc-button>
        <mwc-button slot='secondaryAction' dialogAction='cancel'>
          <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
            กลับ
          </div>
        </mwc-button>
      </mwc-dialog>
    </>
  ) : (
    <div
      className='flex w-full h-full justify-center items-center gap-x-2 cursor-pointer'
      onClick={hook.goBack}
    >
      <mwc-icon>arrow_back</mwc-icon>

      <div className=' text-2xl font-semibold text-blue-800'>ตรวจสอบสถานะคำขอ</div>
    </div>
  )
}

export default RequestDoc
