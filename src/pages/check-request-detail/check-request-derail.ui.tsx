import useCheckRequestDetail from './check-request-derail.use'
const CheckRequestDetailUi: React.FC = () => {
  const hook = useCheckRequestDetail()
  return (
    <>
      <div className='w-full h-full flex flex-col gap-y-12 justify-center items-center'>
        <div
          className='absolute top-20 left-6 border-2 border-gray-400 p-2 rounded-2xl flex gap-x-2 cursor-pointer'
          onClick={hook.onBack}
        >
          <mwc-icon>arrow_back</mwc-icon>
          <span>ย้อนกลับ</span>
        </div>
        <div className=' text-3xl font-semibold text-gray-700 absolute top-20'>
          เพิ่มคำขอตรวจสอบวุฒิ
        </div>

        <div className='p-12 bg-white shadow-xl rounded-xl'>
          <div className='flex gap-x-12'>
            <div className='flex flex-col gap-y-4'>
              <div className='text-semibold text-2xl mb-6'>รายละเอียดเอกสาร</div>

              <div className='flex'>
                <div className=' w-28'>เลขที่หนังสือ</div>
                <input
                  ref={hook.docNumber}
                  className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
                  type='text'
                />
              </div>

              <div className='flex'>
                <div className=' w-28'>เรื่อง</div>
                <input
                  ref={hook.docTitle}
                  className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
                  type='text'
                />
              </div>

              <div className='flex'>
                <div className=' w-28'>หมายเหตุ</div>
                <textarea
                  ref={hook.docNote}
                  className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
                />
              </div>
            </div>

            <div className='flex flex-col gap-y-4'>
              <div className='text-semibold text-2xl mb-6'>ตรวจสอบนักศึกษา</div>

              <div className='flex items-center'>
                <div className=' w-36'>เพิ่มรายชื่อนักศึกษา</div>
                <div
                  onClick={hook.openAddStudentDialog}
                  className='border-2 border-blue-300 rounded-md w-72 flex justify-center items-center py-1 cursor-pointer'
                >
                  <mwc-icon style={{ color: 'blue' }}>add</mwc-icon>
                </div>
                {/* <input className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1' type='text' /> */}
              </div>

              <div style={{ height: 180, overflow: 'auto' }}>
                {hook.studentList.map((student, index) => (
                  <div key={index} className='flex gap-x-4'>
                    <div className=' w-32'>{student.studentId}</div>
                    <div>{student.studentName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {hook.loading ? (
            <div className=' flex justify-center'>
              <mwc-circular-progress Indeterminate></mwc-circular-progress>
            </div>
          ) : (
            <button onClick={hook.saveRequestDoc} className='btn-org flex justify-center'>
              บันทึกคำขอ
            </button>
          )}
        </div>
      </div>

      <mwc-dialog ref={hook.dialogRef}>
        <div style={{ fontFamily: 'Sarabun' }} className='flex flex-col gap-y-4 p-2'>
          <div className='flex'>
            <div className=' w-28'>รหัสนักศึกษา</div>
            <input
              ref={hook.studentId}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='number'
            />
          </div>
          <div className='flex'>
            <div className=' w-28'>ชื่อ-สกุล</div>
            <input
              ref={hook.studentName}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>
        </div>

        <mwc-button slot='primaryAction' raised onClick={hook.addStudent}>
          <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
            เพิ่มนักศึกษา
          </div>
        </mwc-button>
        <mwc-button slot='secondaryAction' dialogAction='cancel'>
          <div style={{ fontFamily: 'Sarabun' }} className=' font-semibold'>
            กลับ
          </div>
        </mwc-button>
      </mwc-dialog>
      <mwc-snackbar ref={hook.snackbarRef} labelText='เพิ่มรายชื่อนักศึกษาแล้ว'></mwc-snackbar>
    </>
  )
}

export default CheckRequestDetailUi
