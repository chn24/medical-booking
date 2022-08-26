import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from '@mui/material'
import { Typography } from '@mui/material'

import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'

import * as yup from 'yup'
import { useFormik } from 'formik'

const roles = ['User', 'Doctor']

const validationSchema = yup.object({
  username: yup
    .string()
    .min(9, 'Min length : 9')
    .max(22, 'Max length : 22')
    .matches(/^\S*$/, 'Username do not contain whitespace')
    .required('Please enter your username'),
  password: yup
    .string()
    .min(9, 'Min length : 9')
    .max(22, 'Max length : 22')
    .matches(/^(?=.*[!@#\$%\^&\*])/, 'One Special Case Character')
    .required('Please enter your password'),
  email: yup.string().email('Enter a valid email').required('Please enter your email'),
  role: yup.string().required('Role is required'),
})

function SignUp() {
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  const [gender, setGender] = useState('')

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      role,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        email: values.email.trim(),
        gender,
      }
      navigate('/signIn')
    },
  })

  // const signUpRequest = async() => {
  //     const postValue = {
  //         username : username.value,
  //         password : password.value,
  //         email : email,
  //         gender : gender,
  //         role : role,
  //     }
  //     var post = await axios.post('https://62c65d1874e1381c0a5d833e.mockapi.io/signUpRequest', postValue);
  // }

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <Box
      className="signUp"
      sx={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
      <Box
        className="signUp-item1"
        sx={{
          height: `${window.innerHeight}px`,
        }}
      >
        <Box className="signUp-item1-bg"></Box>
      </Box>
      <Box className="signUp-item2">
        <Box className="signUp-item2-head">
          <IconButton onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
        </Box>
        <Box className="signUp-item2-body">
          <form className=" signUp-item2-body-formBox" onSubmit={formik.handleSubmit}>
            <div className="signUp-item2-body-formBox-head">
              <Typography variant="h4" fontWeight={700}>
                Account sign up
              </Typography>
              <Typography variant="subtitle2" align="justify" color={'#8692A6'}>
                Become a member and enjoy exclusive promotions.
              </Typography>
            </div>
            <FormControl className="signUp-item2-body-formBox-item">
              <Typography variant="subtitle2">Username</Typography>
              <TextField
                placeholder="Username"
                name="username"
                error={formik.touched.username && Boolean(formik.errors.username)}
                value={formik.values.username}
                onChange={formik.handleChange}
                helperText={formik.touched.username && formik.errors.username}
              />
            </FormControl>
            <FormControl className="signUp-item2-body-formBox-item">
              <Typography variant="subtitle2">Password</Typography>
              <TextField
                placeholder="Password"
                type="password"
                name="password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>
            <FormControl className="signUp-item2-body-formBox-item">
              <Typography variant="subtitle2">Email</Typography>
              <TextField
                placeholder="Email"
                type="email"
                name="email"
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
            <FormControl>
              <Box>
                <Typography variant="subtitle2">Gender</Typography>
                <FormGroup className="signUp-item2-body-checkBox">
                  <FormControlLabel
                    control={<Checkbox checked={gender === 'male' ? true : false} onChange={() => setGender('male')} />}
                    label="Male"
                  ></FormControlLabel>
                  <FormControlLabel
                    control={
                      <Checkbox checked={gender === 'female' ? true : false} onChange={() => setGender('female')} />
                    }
                    label="Female"
                  ></FormControlLabel>
                </FormGroup>
              </Box>
              <Box className="signUp-item2-body-formBox-item">
                <Typography variant="subtitle2">Role</Typography>
                <Autocomplete
                  options={roles}
                  onInputChange={(event, newValue) =>
                    formik.setFieldValue('role', newValue !== null ? newValue : formik.initialValues.role)
                  }
                  renderInput={(params) => (
                    <TextField
                      name="role"
                      value={formik.values.role}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      // onChange={handleroleChange}
                      helperText={formik.touched.role && formik.errors.role}
                      {...params}
                      placeholder="Role"
                    />
                  )}
                />
              </Box>
            </FormControl>
            <Button className="signUp-item2-body-button" variant="contained" type="submit">
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
