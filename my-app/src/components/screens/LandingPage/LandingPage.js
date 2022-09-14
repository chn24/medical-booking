import DoctorHome from '../Home/DoctorHome'
import UserHome from '../Home/UserHome'
import SignIn from '../../layouts/SignIn/SignIn'
import { loginState } from '../../../recoil/loginState'
import { dataState } from '../../../recoil/dataState'
import { useRecoilState } from 'recoil'

const Height = window.innerHeight

function LandingPage() {
  const [isLogin, setLogin] = useRecoilState(loginState)
  const [loginData, setLoginData] = useRecoilState(dataState)

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
