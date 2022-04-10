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
              ไม่อนุมัติ
            </button>
            <button
              onClick={() => hook.changeStatus(StatusLogData.assistantAppove)}
              className='  p-4 bg-blue-500 text-white rounded-md'
            >
              อนุมัติ
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
        hook.services.docs.currentRequestDoc?.statusLog.some(
          (res) => res.status === 'อนุมัติคำขอตรวจสอบวุฒิแล้ว'
        ) ? (
          <div className='flex gap-x-4 absolute right-6 top-6'>
            <button
              onClick={() => hook.findDoc()}
              className=' p-4 bg-red-500 text-white rounded-md'
            >
              ตรวจสอบ
            </button>
          </div>
        ) : null}

        <div
          style={{ minWidth: 512 }}
          className='p-12 px-24 bg-white shadow-xl rounded-xl flex flex-col gap-y-8'
        >
          <div className=' text-2xl font-semibold text-indigo-900 text-center'>
            หนังสือเลขที่: {hook.requestDoc?.docNumber}
          </div>
          <div>
            <div className='text-lg font-semibold text-gray-700'>เรื่อง</div>
            <div>{hook.requestDoc?.docTitle}</div>
            <div>
              สร้างเมื่อ:{' '}
              {hook.services.day.longNameWithTime(hook.requestDoc?.statusLog[0].createdAt!)} น.
            </div>
          </div>

          <div>
            <div className='text-lg font-semibold text-gray-700'>หน่วยงาน</div>
            <div>{hook.orgData?.poi}</div>
            <div>ที่อยู่ {hook.orgData?.etc}</div>
          </div>

          <div>
            <div className='text-lg font-semibold text-gray-700'>รายชื่อนักศึกษา</div>

            {hook.requestDoc?.studentData.map((student, index) => (
              <div key={index} className='flex gap-x-8'>
                <div>รหัสนักศึกษา {student.studentId}</div>
                <div>{student.studentName}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='p-12 bg-white shadow-xl rounded-xl'>
          <div className='text-2xl font-semibold'>สถานะ</div>
          <div className='mt-8'>
            <div className='flex flex-col gap-y-6'>
              {hook.requestDoc?.statusLog.map((status, index) => (
                <div key={index} className='flex gap-x-4 items-center relative'>
                  <div>
                    <div>{hook.services.day.shortNameNumber(status.createdAt!)}</div>
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
                      <div style={{ width: 66 }}>โดย:</div>
                      <span className=' text-blue-700'>{status.createdBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <mwc-dialog ref={hook.dialogRef}>
        <div style={{ fontFamily: 'Sarabun' }} className='flex flex-col gap-y-4'>
          <div className='flex'>
            <div className=' w-28'>คณะ</div>
            <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='number' />
          </div>
          <div className='flex'>
            <div className=' w-28'>วุฒิการศึกษา</div>
            <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='text' />
          </div>

          <div className='flex'>
            <div className=' w-28'>สาขาวิชา</div>
            <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='text' />
          </div>

          <div className='flex'>
            <div className=' w-28'>วันเกิด</div>
            <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='text' />
          </div>

          <div className='flex'>
            <div className=' w-28'>วันที่จบการศึกษา</div>
            <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='text' />
          </div>

          <div className='flex'>
            <div className=' w-28'>เกรด</div>
            <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='text' />
          </div>

          <div className='flex'>
            <div className=' w-28'>ผล</div>
            <div>
              <mwc-button raised>สำเร็จ</mwc-button>
              <mwc-button>ไม่อนุมัติ</mwc-button>
            </div>
          </div>
        </div>
        <mwc-button slot='secondaryAction' dialogAction='cancel'>
          <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
            กลับ
          </div>
        </mwc-button>
        <mwc-button slot='primaryAction' raised>
          <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
            เพิ่มข้อมูลตรวจสอบ
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
