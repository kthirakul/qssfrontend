import axios from 'axios'
import { useEffect } from 'react'
import styles from './app.module.css'
import AppRoute from './app.route'
function App() {
  const a = async () => await axios.get('http://localhost:3001/')

  useEffect(() => {
    const b = async () => {
      console.log('App.js | await a()| = ', (await a()).data)
    }
    b()
  }, [])
  return (
    <div className={styles['app']}>
      <AppRoute />
    </div>
  )
}

export default App
