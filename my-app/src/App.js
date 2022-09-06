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
    // const schedule = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${index}`)
    // if (schedule.data) {
    //   let arr = schedule.data.dates
    //   let fullArr = []
    //   let morningArr = []
    //   let afternoonArr = []
    //   for (let key in arr) {
    //     switch (arr[key].time) {
    //       case 'Full':
    //         fullArr.splice(fullArr.length, 0, arr[key].date)
    //         break
    //       case 'Morning':
    //         morningArr.splice(morningArr.length, 0, arr[key].date)
    //         break
    //       default:
    //         afternoonArr.splice(afternoonArr.length, 0, arr[key].date)
    //         break
    //     }
    //   }
    // }
    setLoginData({
      information: information.data,
      roll: 'Doctor',
      // schedule: {
      //   value: schedule.data.dates,
      //   full: fullArr,
      //   morning: morningArr,
      //   afternoon: afternoonArr,
      // },
      // booking: schedule.data.bookings,
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
              {' '}
              <DoctorList />{' '}
            </ProtectedRoute>
          }
        ></Route>
        <Route path="doctor-list/doctor-information">
          <Route path=":doctorid" element={<DoctorInformation />}></Route>
          {/* <Route path=":tabname" element={<CommentTab/>}></Route> */}
        </Route>
        <Route path="/doctor-list/booking" element={<Booking />}></Route>
        <Route path="/your-schedule" element={<DoctorSchedule />}></Route>
        <Route path="/your-profile" element={<DoctorProfile />}></Route>
        <Route path="/booking-schedule" element={<BookingSchedule />}></Route>
        <Route path="news" element={<News />}></Route>
        <Route path="your-booking" element={<UserBooking />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

const ProtectedRoute = ({ isLogin, path, children }) => {
  console.log(isLogin)
  if (!isLogin) {
    return <p>error</p>
  }
  return children
}

export default App

// features , pages , còn layouts ~ components common, const navigation  = useNavigation()
