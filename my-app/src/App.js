import './App.css'
import { createContext, useEffect } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

//------------------------------------------------------------Route
import ProtectedRoute from './components/common/ProtectedRoute'
import DoctorRoute from './components/common/DoctorRoute'

//------------------------------------------------------------Components
import LandingPage from './pages/landingPage'
import SignUp from './components/layouts/SignUp/SignUp'
import DoctorInformation from './pages/doctorIn4'
import Booking from './pages/booking'
import DoctorList from './components/screens/doctorList'
import DoctorSchedule from './pages/doctorSchedule'
import DoctorProfile from './pages/docotoProfile'
import BookingSchedule from './components/screens/BookingSchedule'
import News from './pages/news'
import UserBooking from './pages/userBooking'
import Feedback from './pages/feedback'
import NotFound from './components/screens/ErrorPages/Error404'

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
          path="booking-schedule"
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

        <Route path="/feedback">
          <Route
            path=":doctorId"
            element={
              <ProtectedRoute isLogin={isLogin.login} path="">
                <Feedback />
              </ProtectedRoute>
            }
          ></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

// features , pages , còn layouts ~ components common, const navigation  = useNavigation()
