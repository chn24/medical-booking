import { Box, FormControl, Grid, IconButton, OutlinedInput, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import SignInAlert from './SignInAlert'
import axios from 'axios'
import HomeIcon from '@mui/icons-material/Home'

import { loginState } from '../../recoil/loginState'
import { dataState } from '../../recoil/dataState'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import { useFormik } from 'formik'

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

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})

function SignIn() {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [loginData, setLoginData] = useRecoilState(dataState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [usernameAlert, setUsernameAlert] = useState(false)

  const [passwordAlert, setPasswordAlert] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let newValues = {
        username: values.username.trim(),
        password: values.password.trim(),
      }
      handleClick(newValues)
    },
  })

  const getDoctorData = async (index) => {
    const information = await axios.get(`https://jsonplaceholder.typicode.com/users/${index}`)

    setLoginData({
      information: information.data,
      roll: 'Doctor',
    })
    setIsLogin({
      login: true,
      id: index,
      roll: 'User',
    })

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
        roll: 'User',
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
    const res = await axios.get('https://62c65d1874e1381c0a5d833e.mockapi.io/signinEr')
    if (res.data) {
      const random = Math.floor(Math.random() * res.data.length)
      if (res.data[random].isError) {
        setError(true)
        if (res.data[random].usernameError) {
          setUsernameAlert(true)
        } else {
          setUsernameAlert(false)
        }
        if (res.data[random].passwordError) {
          setPasswordAlert(true)
        } else {
          setPasswordAlert(false)
        }
      }
    }
  }

  const handleClick = async (values) => {
    setUsernameAlert(false)
    setPasswordAlert(false)
    setLoading(true)
    if (doctors.includes(values.username)) {
      let index = doctors.indexOf(values.username) + 1
      await getDoctorData(index)
    } else if (users.includes(values.username)) {
      let index = users.includes(values.username) + 10
      getUserData(index)
    } else {
      await testApi()
    }
    setLoading(false)
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <div className="signIn">
      <Box
        className="signIn-container"
        sx={{
          minHeight: `${window.innerHeight}px`,
        }}
      >
        <Box className="signIn-item1">
          <Box className="sI-bg signIn-bg"></Box>
        </Box>
        <Box className="signIn-item2">
          <Box className="signIn-item2-head">
            <IconButton onClick={handleHomeClick}>
              <HomeIcon />
            </IconButton>
          </Box>
          <Box className="signIn-item2-body">
            <Box className=" signIn-item2-formBox" sx={{ width: '50%', position: 'relative' }}>
              <SignInAlert in={error} changeAlert={setError} title={'Login fail'} />
              <Typography variant="h4" margin={'8px'} fontWeight="700">
                Account Login
              </Typography>
              <Typography variant="subtitle2" align="justify" color={'#8692A6'} margin={'8px'}>
                If you are already a member you can login with your email address and password.
              </Typography>
              <form className="signIn-item2-form" onSubmit={formik.handleSubmit}>
                <FormControl className="signIn-item2-form-item">
                  <Box className="signIn-item2-form-box"></Box>
                  <Typography variant="subtitle1">Username</Typography>
                  <TextField
                    placeholder="Username"
                    name="username"
                    error={(formik.touched.username && Boolean(formik.errors.username)) || usernameAlert}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl className="signIn-item2-form-item">
                  <Box className="signIn-item2-form-box"></Box>
                  <Typography variant="subtitle1">Password</Typography>
                  <TextField
                    placeholder="Password"
                    type="password"
                    name="password"
                    error={(formik.touched.password && Boolean(formik.errors.password)) || passwordAlert}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <Box className="signIn-item2-form-box"></Box>
                <LoadingButton variant="contained" loading={loading} className="signIn-item2-form-button" type="submit">
                  Login
                </LoadingButton>

                <Typography variant="subtitle2" className="signIn-item2-form-note">
                  Don't have an account ?<NavLink to="/signUp">Sign up here</NavLink>
                </Typography>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default SignIn
