import { Box, FormControl, Grid, OutlinedInput, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import SignInAlert from './SignInAlert'
import axios from 'axios'
import './assets/scss/signIn.scss'

import { loginState } from '../../recoil/loginState'
import { dataState } from '../../recoil/dataState'
import { useRecoilState, useSetRecoilState } from 'recoil'

const doctors = [
  'doctor1',
  'doctor2',
  'doctor3',
  'doctor4',
  'doctor5',
  'doctor6',
  'doctor7',
  'doctor8',
  'doctor9',
  'doctor10',
]

const users = ['user1', 'user2', 'user3', 'user4', 'user5']

function SignIn() {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [loginData, setLoginData] = useRecoilState(dataState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState({
    value: '',
    changed: false,
    error: false,
  })
  const [usernameAlert, setUsernameAlert] = useState(false)
  const [password, setPassword] = useState({
    value: '',
    changed: false,
    error: false,
  })
  const [passwordAlert, setPasswordAlert] = useState(false)

  const getDoctorData = async (index) => {
    const information = await axios.get(`https://jsonplaceholder.typicode.com/users/${index}`)
    const schedule = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${index}`)
    if (schedule.data) {
      let arr = schedule.data.dates
      let fullArr = []
      let morningArr = []
      let afternoonArr = []
      for (let key in arr) {
        switch (arr[key].time) {
          case 'Full':
            fullArr.splice(fullArr.length, 0, arr[key].date)
            break
          case 'Morning':
            morningArr.splice(morningArr.length, 0, arr[key].date)
            break
          default:
            afternoonArr.splice(afternoonArr.length, 0, arr[key].date)
            break
        }
      }
      setLoginData({
        information: information.data,
        roll: 'Doctor',
        schedule: {
          value: schedule.data.dates,
          full: fullArr,
          morning: morningArr,
          afternoon: afternoonArr,
        },
        booking: schedule.data.bookings,
      })
      setIsLogin({
        login: true,
        id: index,
      })
    }

    navigate('/')
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
      setIsLogin({
        login: true,
        id: res.data.id,
      })
    }
    navigate('/')
  }

  const testApi = async () => {
    // const postValue = {
    //   username: username.value,
    //   password: password.value,
    // }
    // var post = await axios.post(
    //   "https://62c65d1874e1381c0a5d833e.mockapi.io/signInRequest",
    //   postValue
    // );
    var res = await axios.get('https://62c65d1874e1381c0a5d833e.mockapi.io/signinEr')
    if (res.data) {
      var random = Math.floor(Math.random() * res.data.length)
      if (res.data[random].isError) {
        setError(true)
        if (res.data[random].usernameError) {
          setUsername({
            ...username,
            error: true,
          })
        } else {
          setUsername({
            ...username,
            error: false,
          })
        }
        if (res.data[random].passwordError) {
          setPassword({
            ...password,
            error: true,
          })
        } else {
          setPassword({
            ...password,
            error: false,
          })
        }
      }
    }
  }

  const handleClick = async () => {
    if (!username.changed || username.value === '') {
      setUsernameAlert(true)
      setUsername({
        ...username,
        error: true,
      })
    } else if ((username.changed && !password.changed) || password.value === '') {
      setUsernameAlert(false)
      setUsername({
        ...username,
        error: false,
      })
      setPasswordAlert(true)
      setPassword({
        ...password,
        error: true,
      })
    } else {
      setUsernameAlert(false)
      setPasswordAlert(false)
      setLoading(true)
      if (doctors.includes(username.value)) {
        let index = doctors.indexOf(username.value) + 1
        await getDoctorData(index)
      } else if (users.includes(username.value)) {
        let index = users.includes(username.value) + 10
        getUserData(index)
      } else {
        await testApi()
      }
      setLoading(false)
    }
  }

  return (
    <div className="sign-In">
      <Box
        sx={{
          minHeight: `${window.innerHeight}px`,
          display: 'flex',
        }}
      >
        <Box
          className="sI-item sI-res-disNone "
          sx={{
            backgroundColor: '#2C73EB',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box className="sI-bg"></Box>
        </Box>
        <Box
          className="sI-item"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'rgb(240, 242, 245)',
          }}
        >
          <Box className="sI-res-form" sx={{ width: '50%', position: 'relative' }}>
            <SignInAlert in={usernameAlert} changeAlert={setUsernameAlert} title={'Username required'} />
            <SignInAlert in={passwordAlert} changeAlert={setPasswordAlert} title={'Password required'} />
            <SignInAlert in={error} changeAlert={setError} title={'Login fail'} />
            <Typography variant="h4" margin={'8px'} fontWeight="700">
              Account Login
            </Typography>
            <Typography variant="subtitle2" align="justify" color={'#8692A6'} margin={'8px'}>
              If you are already a member you can login with your email address and password.
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1 },
                display: 'flex',
                flexDirection: 'column',
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl
                sx={{
                  margin: '0 5px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '20px',
                  }}
                ></Box>
                <Typography variant="subtitle1">Username</Typography>
                <OutlinedInput
                  placeholder="Username"
                  error={username.error}
                  value={username.value}
                  onChange={(e) =>
                    setUsername({
                      ...username,
                      changed: true,
                      value: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl
                sx={{
                  margin: '0 5px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '20px',
                  }}
                ></Box>
                <Typography variant="subtitle1">Password</Typography>
                <OutlinedInput
                  placeholder="Password"
                  type="password"
                  error={password.error}
                  value={password.value}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      changed: true,
                      value: e.target.value,
                    })
                  }
                />
              </FormControl>
              <LoadingButton
                variant="contained"
                loading={loading}
                sx={{
                  height: '56px',
                }}
                onClick={handleClick}
              >
                Login
              </LoadingButton>

              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                  color: '#696F79',
                }}
              >
                Don't have an account ?
                <NavLink
                  to="/signUp"
                  style={{
                    textDecoration: 'none',
                    color: '#2C73EB',
                  }}
                >
                  Sign up here
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default SignIn
