import LPNav from './LPNav'
import DoctorHome from '../Home/DoctorHome'
import UserHome from '../Home/UserHome'
import SignIn from '../SignInSignUp/SignIn'
import LoadingPage from '../LoadingPage'
import { loginState } from '../../recoil/loginState'
import { dataState } from '../../recoil/dataState'
import { Box } from '@mui/material'
import { useRecoilState } from 'recoil'
import { useState } from 'react'

const Height = window.innerHeight

function LandingPage() {
  const [isLogin, setLogin] = useRecoilState(loginState)
  const [loginData, setLoginData] = useRecoilState(dataState)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (lSLoginData.login === true) {
  //     setLogin(true)
  //     setLoginData(lSLoginData.data)
  //   }

  //   setLoading(false)
  // }, [])

  return isLogin.login ? (
    loginData.roll === '' ? null : loginData.roll === 'Doctor' ? (
      <DoctorHome />
    ) : (
      <UserHome />
    )
  ) : (
    <SignIn />
  )
}

export default LandingPage
