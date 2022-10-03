import { useRecoilState } from 'recoil'
import { loginState } from '../../recoil/loginState'

import HomeLayout from '../../components/layouts/User'
import SignIn from '../../components/layouts/SignIn/SignIn'
import LandingPageChild from '../../components/screens/LandingPage/LandingPage'

const LandingPage = () => {
  const [isLogin, setLogin] = useRecoilState(loginState)
  return isLogin.login ? (
    <HomeLayout>
      <LandingPageChild />
    </HomeLayout>
  ) : (
    <SignIn />
  )
}

export default LandingPage
