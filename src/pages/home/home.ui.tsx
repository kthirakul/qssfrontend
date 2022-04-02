import Wallpaper from '../../assets/images/logo-wallpaper.png'
import logoUru from '../../assets/images/uru-logo.png'
import styles from './home.module.css'
import HomeUse from './home.use'

const HomeUi: React.FC = () => {
  const { number, route } = HomeUse()
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
          <button className={styles['btn-org']}>ขอตรวจสอบวุฒิการศึกษา</button>
          <button className={styles['btn-org']}>ดูสถานะคำขอตรวจสอบวุฒิ</button>
        </div>

        <div className='w-full'>
          <div className={styles['w-emp']}>
            <div className='text-2xl font-semibold text-slate-800'>บุคลากร</div>
            <input className={styles['t-input']} type='text' placeholder='อีเมล' />
            <input className={styles['t-input']} type='text' placeholder='รหัสผ่าน' />
            <button className={styles['btn-login']}>เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeUi

//  <div>Route : {route.val.route}</div>
//       <div>{number.val.count}</div>
//       <button
//         className={`${styles['btn']} ${styles['btn-blue']}`}
//         onClick={() => number.set({ type: 'increment' })}
//       >
//         increment number
//       </button>
//       <button
//         className={`${styles['btn']} ${styles['btn-blue']}`}
//         onClick={() => number.set({ type: 'decrement' })}
//       >
//         decrement number
//       </button>
