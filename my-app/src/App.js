import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LandingPage from './layouts/LandingPage/LandingPage'
import SignIn from './layouts/SignInSignUp/SignIn'
import SignUp from './layouts/SignInSignUp/SignUp'
import DoctorInformation from './layouts/Doctors/DoctorIn4/DoctorInormation'
import Booking from './layouts/Doctors/Booking/Booking'
import { createContext, useState } from 'react'
import DoctorList from './layouts/Doctors/doctorList'
import DoctorSchedule from './layouts/DocterView/DocterSchedule'
import DoctorProfile from './layouts/DocterView/DoctorProfile'
import BookingSchedule from './layouts/DocterView/BookingSchedule'
import News from './layouts/News'
import { RecoilRoot } from 'recoil'

export const LogginContext = createContext()

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [loginData, setLoginData] = useState({
    information: {},
    role: null,
    schedule: {
      value: [],
      full: [],
      morning: [],
      afternoon: [],
    },
  })

  return (
    <LogginContext.Provider value={{ isLogin, setIsLogin, loginData, setLoginData }}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/doctor-list" element={<DoctorList />}></Route>
            <Route path="doctor-list/:doctorid" element={<DoctorInformation />}>
              {/* <Route path=":tabname" element={<CommentTab/>}></Route> */}
            </Route>
            <Route path="/doctor-list/booking" element={<Booking />}></Route>
            <Route path="/your-schedule" element={<DoctorSchedule />}></Route>
            <Route path="/your-profile" element={<DoctorProfile />}></Route>
            <Route path="/booking-schedule" element={<BookingSchedule />}></Route>
            <Route path="news" element={<News />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </LogginContext.Provider>
  )
}

export default App
