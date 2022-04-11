import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import styles from './layout.module.css'
import useLayout from './layout.use'

const LayoutUi: React.FC = ({ children }) => {
  const hook = useLayout()
  const disabledBar = hook.pathname === '/' && !hook.user.currentUser
  return (
    <div className={styles['wrap']}>
      <div hidden={disabledBar} className={styles['bar']}>
        <Link to='/'>
          <div className=' text-blue-800 font-semibold'>EQS System</div>
        </Link>
        <div className='flex gap-x-4'>
          {/* ธุรการ */}
          {hook.currentUser?.email === 'eqs_assistant@gmail.com' && (
            <>
              <Button onClick={() => hook.navbarGoto('/request-list')} className='flex gap-x-2'>
                <mwc-icon>assignment</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>คัดกรองคำขอ</div>
              </Button>
              <Button onClick={() => hook.navbarGoto('/result-list')} className='flex gap-x-2'>
                <mwc-icon>fact_check</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>รอรายงานผล</div>
              </Button>
            </>
          )}

          {/* ฝ่ายทะเบียน */}
          {hook.currentUser?.email === 'eqs_registration@gmail.com' && (
            <>
              <Button onClick={() => hook.navbarGoto('/find-list')} className='flex gap-x-2'>
                <mwc-icon>find_in_page</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>ตรวจสอบวุฒิ</div>
              </Button>
            </>
          )}

          {/* หัวหน้าฝ่าย */}
          {hook.currentUser?.email === 'eqs_manager@gmail.com' && (
            <>
              <Button onClick={() => hook.navbarGoto('/approved-list')} className='flex gap-x-2'>
                <mwc-icon>note_add</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>คำขอที่ผ่านการคัดกรอง</div>
              </Button>
            </>
          )}

          {/* นายทะเบียน */}
          {hook.currentUser?.email === 'eqs_registrar@gmail.com' && (
            <>
              <Button onClick={() => hook.navbarGoto('/checked-list')} className='flex gap-x-2'>
                <mwc-icon>note_add</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>คำขอที่ตรวจสอบแล้ว</div>
              </Button>
            </>
          )}

          {hook.currentUser?.email && (
            <>
              <Button onClick={() => hook.navbarGoto('/all-docs')} className='flex gap-x-2'>
                <mwc-icon>assessment</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>คำขอทั้งหมด</div>
              </Button>
            </>
          )}
          {/* {hook.currentUser?.email && (
            <>
              <Button className='flex gap-x-2'>
                <mwc-icon>assessment</mwc-icon>
                <div style={{ fontFamily: 'Sarabun' }}>รายงาน</div>
              </Button>
            </>
          )} */}
        </div>
        <button
          hidden={!hook.user.currentUser}
          className={styles['btn-logout']}
          onClick={hook.logout}
        >
          <mwc-icon>login</mwc-icon>
          <span>ออกจากระบบ</span>
        </button>
      </div>
      <div className={styles['content']}>{children}</div>
      {/* <div hidden={hook.pathname === '/' && !hook.user.currentUser} className={styles['bar']}></div> */}
    </div>
  )
}

export default LayoutUi
