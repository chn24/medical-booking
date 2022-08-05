import styles from './LandingPage.module.scss'
import LPNav from './LPNav'
import DoctorHome from '../Home/DoctorHome'
import UserHome from '../Home/UserHome'
import { loginState } from '../../recoil/loginState'
import { dataState } from '../../recoil/dataState'
import { Box } from '@mui/material'
import { useRecoilValue } from 'recoil'

const Height = window.innerHeight

function LandingPage() {
  const isLogin = useRecoilValue(loginState)
  const loginData = useRecoilValue(dataState)

  console.log(loginData)

  return (
    <div
      className={styles.main}
      style={{
        minHeight: `${Height - 1}px`,
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav />
      {isLogin ? (
        loginData.roll === 'Doctor' ? (
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
