import LPNav from './LPNav'
import DoctorHome from '../Home/DoctorHome'
import UserHome from '../Home/UserHome'
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

  return (
    <div
      className="lPmain"
      style={{
        minHeight: `${Height - 1}px`,
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav />
      {isLogin.login ? (
        loginData.roll === '' ? (
          <LoadingPage />
        ) : loginData.roll === 'Doctor' ? (
          <DoctorHome />
        ) : (
          <UserHome />
        )
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Đăng nhập để xem thêm
        </Box>
      )}
    </div>
  )
}

export default LandingPage
