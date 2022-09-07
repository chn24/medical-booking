import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import LandingPage from './layouts/LandingPage/LandingPage'
import SignIn from './layouts/SignInSignUp/SignIn'
import SignUp from './layouts/SignInSignUp/SignUp'
import DoctorInformation from './layouts/Doctors/DoctorIn4/DoctorInormation'
import Booking from './layouts/Doctors/Booking/Booking'
import { createContext, useEffect } from 'react'
import DoctorList from './layouts/Doctors/doctorList'
import DoctorSchedule from './layouts/DocterView/DocterSchedule'
import DoctorProfile from './layouts/DocterView/DoctorProfile'
import BookingSchedule from './layouts/DocterView/BookingSchedule'
import News from './layouts/News'
import UserBooking from './layouts/UserBooking'
import NotFound from './layouts/ErrorPages/Error404'
import Error403 from './layouts/ErrorPages/Error403'

import axios from 'axios'
import { dataState } from './recoil/dataState'
import { loginState } from './recoil/loginState'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const LogginContext = createContext()

function App() {
  const setLoginData = useSetRecoilState(dataState)
  const isLogin = useRecoilValue(loginState)

  const getDoctorData = async (index) => {
    const information = await axios.get(`https://jsonplaceholder.typicode.com/users/${index}`)

    setLoginData({
      information: information.data,
      roll: 'Doctor',
    })
  }

  const getUserData = async (index) => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${index}`)
    if (res.data) {
      setLoginData({
        information: {
          name: res.data.name,
        },
        roll: 'User',
      })
    }
  }

  useEffect(() => {
    if (isLogin.login) {
      if (isLogin.id >= 1 && isLogin.id <= 10) {
        getDoctorData(isLogin.id)
      } else {
        getUserData(isLogin.id)
      }
    }
  }, [])
  // const [isLogin, setIsLogin] = useState(false)

  // ==> protected route

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

        <Route path="/signUp" element={<SignUp />}></Route>

        <Route
          path="/doctor-list"
          element={
            <ProtectedRoute isLogin={isLogin.login} path="">
              <DoctorList />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="doctor-list/doctor-information">
          <Route path=":doctorid" element={<DoctorInformation />}></Route>
          {/* <Route path=":tabname" element={<CommentTab/>}></Route> */}
        </Route>

        <Route
          path="/doctor-list/booking"
          element={
            <ProtectedRoute isLogin={isLogin.login} path="">
              <Booking />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/your-schedule"
          element={
            <DoctorRoute isLogin={isLogin} path="">
              <DoctorSchedule />
            </DoctorRoute>
          }
        ></Route>

        <Route
          path="/your-profile"
          element={
            <DoctorRoute isLogin={isLogin} path="">
              <DoctorProfile />
            </DoctorRoute>
          }
        ></Route>

        <Route
          path="/booking-schedule"
          element={
            <ProtectedRoute isLogin={isLogin.login} path="">
              <BookingSchedule />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="news"
          element={
            <ProtectedRoute isLogin={isLogin.login} path="">
              <News />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="your-booking"
          element={
            <ProtectedRoute isLogin={isLogin.login} path="">
              <UserBooking />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

const ProtectedRoute = ({ isLogin, path, children }) => {
  if (!isLogin) {
    return <Error403 />
  }
  return children
}

const DoctorRoute = ({ isLogin, path, children }) => {
  if (!isLogin.login || (isLogin.login && isLogin.roll === 'User')) {
    return <Error403 />
  }
  return children
}

export default App

// features , pages , còn layouts ~ components common, const navigation  = useNavigation()
