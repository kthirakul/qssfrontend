import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
const useHome = () => {
  const { user, docs } = Services()
  const navigate = useNavigate()
  // service
  // declare
  //
  // hooks
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  // function

  const login = () => {
    user.login(emailRef.current?.value, passwordRef.current?.value)
  }

  const gotoCheckRequestStatus = () => {
    navigate('/check-request-status', { replace: true })
  }

  const gotocheckRequest = () => {
    docs.setOrgDoc(null)
    window.location.href = 'check-request'
  }

  // execute

  return {
    emailRef,
    passwordRef,
    login,
    user,
    gotocheckRequest,
    gotoCheckRequestStatus,
  }
}

export default useHome
