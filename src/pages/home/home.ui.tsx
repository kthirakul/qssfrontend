import styles from './home.module.css'
import HomeUse from './home.use'

const HomeUi: React.FC = () => {
  const { number } = HomeUse()
  return (
    <div className={styles['test']}>
      <div>{number.val.count}</div>
      <button onClick={() => number.set({ type: 'increment' })}>increment number</button>
      <button onClick={() => number.set({ type: 'decrement' })}>decrement number</button>
    </div>
  )
}

export default HomeUi
