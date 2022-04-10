import { useEffect, useState } from 'react'
import { UserLogin } from '../interfaces'

type UserError = 'LOGIN_FAILED'

const UsersServices = () => {
  // constants
  const test = {
    email: 'test',
    password: 'test',
    name: 'test',
  }

  const assistant = {
    email: 'eqs_assistant@gmail.com',
    password: '123456',
    name: 'ฝ่ายธุรการ',
  }

  const registration = {
    email: 'eqs_registration@gmail.com',
    password: '123456',
    name: 'ฝ่ายทะเบียน',
  }

  const registrar = {
    email: 'eqs_registrar@gmail.com',
    password: '123456',
    name: 'นายทะเบียน',
  }

  const manager = {
    email: 'eqs_manager@gmail.com',
    password: '123456',
    name: 'หัวหน้าฝ่าย',
  }

  const users = [assistant, registration, registrar, manager, test]
  // state
  const [currentUser, setCurrentUser] = useState<UserLogin | null | undefined>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [userLoading, setUserLoading] = useState(false)
  const [error, setError] = useState<UserError | null>(null)

  // function

  const switchRoute = (email: string | undefined) => {
    if (email) {
      switch (email) {
        case 'eqs_assistant@gmail.com':
          window.location.href = '/request-list'
          break

        case 'eqs_manager@gmail.com':
          window.location.href = '/approved-list'
          break

        case 'eqs_registration@gmail.com':
          window.location.href = '/find-list'
          break
        default:
          break
      }
    }
  }

  const login = (email: string | undefined, password: string | undefined) => {
    setUserLoading(true)
    setTimeout(() => {
      const userSignin = findUser(email)
      const isValidated = validatePassword(userSignin?.password, password)
      if (isValidated) {
        setUserLoading(true)
        window.localStorage.setItem('email', userSignin?.email || '')
        setUserLoading(false)
        switchRoute(email)
      } else {
        setError('LOGIN_FAILED')
      }
      setUserLoading(false)
    }, 1000)
  }

  const findUser = (email: string | undefined) => users.find((user) => user.email === email)

  const validatePassword = (userPassword: string | undefined, password: string | undefined) =>
    userPassword === password

  // execute
  useEffect(() => {
    const emailStorage = window.localStorage.getItem('email')
    if (emailStorage) {
      const userSignin = findUser(emailStorage)
      setCurrentUser(userSignin)
    }
  }, [])

  return {
    email,
    setEmail,
    assistant,
    registrar,
    manager,
    registration,
    login,
    currentUser,
    userLoading,
    error,
  }
}

export default UsersServices
