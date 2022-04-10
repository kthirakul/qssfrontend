import useCheckRequestStatus from './check-request-status.use'

const CheckRequestStatusUi: React.FC = () => {
  const hook = useCheckRequestStatus()
  return (
    <div className='w-full h-full flex flex-col gap-y-12 justify-center items-center'>
      <div className=' text-3xl font-semibold text-gray-700 absolute top-20'>
        ตรวจสอบสถานะคำขอตรวจสอบวุฒิ
      </div>

      <div className='p-12 bg-white shadow-xl rounded-xl'>
        <div className='flex flex-col gap-y-4'>
          <div className='text-semibold text-2xl mb-6'>รายละเอียดเอกสาร</div>

          <div className='flex'>
            <div className=' w-28'>ชื่อหน่วยงาน</div>
            <input
              ref={hook.orgNameRef}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>

          <div className='flex'>
            <div className=' w-28'>เลขที่หนังสือ</div>
            <input
              ref={hook.docNumber}
              className=' border-2 border-blue-300 rounded-md w-72 px-2 py-1'
              type='text'
            />
          </div>
        </div>
        <button onClick={hook.checkRequestDoc} className='btn-org flex justify-center mt-12'>
          ตรวจสอบสถานะ
        </button>
      </div>
    </div>
  )
}

export default CheckRequestStatusUi
