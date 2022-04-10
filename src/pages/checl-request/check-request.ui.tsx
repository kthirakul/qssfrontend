import useCheckRequest from './check-request.use'

const CheckRequstUi: React.FC = () => {
  const hook = useCheckRequest()
  return (
    <div className='w-full h-full flex flex-col gap-y-12 justify-center items-center'>
      <div className=' text-3xl font-semibold text-gray-700 absolute top-20'>เพิ่มคำขอตรวจสอบวุฒิ</div>

      <div className='p-12 bg-white shadow-xl rounded-xl'>
        <div className='text-semibold text-2xl mb-6'>รายละเอียดหน่วยงาน</div>

        <div ref={hook.longdoRef} id='form_div'></div>
        
        <button className='btn-org flex justify-center mt-12' onClick={hook.getLongdoData}>
          ถัดไป
        </button>
      </div>
    </div>
  )
}

export default CheckRequstUi
