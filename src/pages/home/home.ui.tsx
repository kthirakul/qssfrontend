import styles from './home.module.css'
import HomeUse from './home.use'

const HomeUi: React.FC = () => {
  const { number, route } = HomeUse()
  return (
    <div className={styles['app']}>
      <div>Route : {route.val.route}</div>
      <div>{number.val.count}</div>
      <button
        className={`${styles['btn']} ${styles['btn-blue']}`}
        onClick={() => number.set({ type: 'increment' })}
      >
        increment number
      </button>
      <button
        className={`${styles['btn']} ${styles['btn-blue']}`}
        onClick={() => number.set({ type: 'decrement' })}
      >
        decrement number
      </button>
    </div>
  )
}

export default HomeUi
