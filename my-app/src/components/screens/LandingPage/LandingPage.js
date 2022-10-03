import UserHome from '../Home/UserHome'
import DoctorHome from '../Home/DoctorHome'

import { useRecoilState } from 'recoil'
import { dataState } from '../../../recoil/dataState'

function LandingPage() {
  const [loginData, setLoginData] = useRecoilState(dataState)

  return loginData.roll === '' ? null : loginData.roll === 'Doctor' ? <DoctorHome /> : <UserHome />
}

export default LandingPage
