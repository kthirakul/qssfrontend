import useRequestList from './request-list.use'

const RequestListUi: React.FC = () => {
  const hook = useRequestList()
  return hook.allDocs ? (
    <div className=' w-full h-full relative'>
      <div className=' text-2xl font-semibold text-center mt-12'>รายการคำขอตรวจสอบวุฒิ</div>
      <div className='p-12 flex flex-col gap-y-6'>
        {hook.allDocs.map((res) => {
          return res.docData
            .filter(
              (res2) =>
                !res2.statusLog.some(
                  (res) =>
                    res.status === 'คัดกรองคำขอตรวจสอบวุฒิแล้ว' ||
                    res.status === 'ไม่ผ่านการคัดกรอง'
                )
            )
            .map((res1, index) => {
              console.log('index', index)
              return (
                <div key={index} className='btn-list' onClick={() => hook.goto(res, res1)}>
                  <div>{res.orgData?.poi}</div>
                  <div>{res1.docTitle}</div>
                  <div>จำนวนนักศึกษา {res1.studentData.length} คน</div>

                  <div>
                    <span className='mr-2'>สร้างเมื่อ</span>
                    {hook.servoces.day.longNameWithTime(
                      res1.statusLog[res1.statusLog.length - 1].createdAt
                    )}{' '}
                    น.
                  </div>
                </div>
              )
            })
        })}
      </div>
    </div>
  ) : (
    <div className='flex w-full h-full justify-center items-center gap-x-2 cursor-pointer'>
      <div className=' text-2xl font-semibold text-blue-800'>ไม่มีรายการคำขอ</div>
    </div>
  )
}

export default RequestListUi
