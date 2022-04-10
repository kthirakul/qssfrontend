import Wallpaper from '../../assets/images/logo-wallpaper.png'
import logoUru from '../../assets/images/uru-logo.png'
import styles from './home.module.css'
import useHome from './home.use'

const HomeUi: React.FC = () => {
  const hook = useHome()
  return (
    <div className={styles['w-home']}>
      {/* wallpaper */}
      <div className={styles['w-wallpaper']}>
        <img src={Wallpaper} alt='' />
      </div>

      {/* logo */}
      <div className={styles['w-logo']}>
        <img src={logoUru} alt='' />
        <div className='text-3xl font-bold text-slate-900'>
          <div>URU</div>
          <div>EQS System</div>
        </div>
      </div>

      {/* content */}
      <div className='flex w-full h-full'>
        <div className='w-full flex flex-col gap-y-3 items-center pt-12'>
          <div className={styles['t-org']}>สำหรับหน่วยงานภายนอก</div>
          <button onClick={hook.gotocheckRequest} className={styles['btn-org']}>
            ขอตรวจสอบวุฒิการศึกษา
          </button>
          <button onClick={hook.gotoCheckRequestStatus} className={styles['btn-org']}>
            ดูสถานะคำขอตรวจสอบวุฒิ
          </button>
        </div>

        <div className='w-full'>
          <div className={styles['w-emp']}>
            <div className='text-2xl font-semibold text-slate-800'>บุคลากร</div>
            <input
              ref={hook.emailRef}
              className={styles['t-input']}
              type='text'
              placeholder='อีเมล'
            />
            <input
              ref={hook.passwordRef}
              className={styles['t-input']}
              type='password'
              placeholder='รหัสผ่าน'
            />
            {hook.user.error === 'LOGIN_FAILED' && (
              <div className='text-red-600 flex gap-x-1'>
                <mwc-icon>info</mwc-icon>
                <span>อีเมลหรือรหัสผ่านผิดพลาด</span>
              </div>
            )}

            {hook.user.userLoading ? (
              <div className='flex justify-center'>
                <mwc-circular-progress Indeterminate></mwc-circular-progress>
              </div>
            ) : (
              <button onClick={hook.login} className={styles['btn-login']}>
                <span>เข้าสู่ระบบ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeUi

// สำนักงานขนส่งจังหวัดอุตรดิตถ์
// กข123456
// สำนักงานขนส่งจังหวัดอุดรธานีแห่งที่ 2
// {
//     "docNumber": "กข12345",
//     "docTitle": "ขอตรวจสอบวุฒิการศึกษา",
//     "docNote": "",
//     "studentData": [
//         {
//             "studentId": "123456789",
//             "studentName": "สมใจ มานะ"
//         },
//         {
//             "studentId": "123456789",
//             "studentName": "สมหญิง ดีใจ"
//         }
//     ],
//     "statusLog": [
//         {
//             "createdAt": "2022-04-10T05:49:29.070Z",
//             "createdBy": "สำนักงานขนส่งจังหวัดอุตรดิตถ์",
//             "status": "ส่งคำขอตรวจสอบวุฒิแล้ว"
//         }
//     ]
// }
