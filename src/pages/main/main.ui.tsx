import UruLogo from '../../assets/images/uru-logo_2.png'

const MainUi: React.FC = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center pb-18'>
      <img width={180} src={UruLogo} alt='' />
      <div className='text-xl'>ระบบรับส่งเอกสารขอตรวจสอบวุฒิการศึกษาของมหาวิทยาลัยราชภัฏอุตรดิตถ์</div>
      <div className='text-xl'>Educational Qualifications Submission System</div>
      <div className='text-xl font-semibold text-gray-700'>(EQS System)</div>
    </div>
  )
}

export default MainUi
