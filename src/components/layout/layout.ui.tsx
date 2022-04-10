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
        <div></div>
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
