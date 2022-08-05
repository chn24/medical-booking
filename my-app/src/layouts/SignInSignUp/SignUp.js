import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HP from '../assets/image/HealthProfessional.png'

const specialChars = ['!', ',', '.', '/']
const roles = ['User', 'Doctor']

function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = useState({
    value: '',
    changed: false,
    error: false,
  })
  const [password, setPassword] = useState({
    value: '',
    changed: false,
    error: {
      length: false,
      numSL: 0,
      specialLetter: false,
      isError: false,
    },
  })
  const [role, setRole] = useState({
    value: null,
    changed: false,
    error: false,
  })
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')

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

  const handleUsernameChange = (e) => {
    const value = e.target.value
    if (value.length < 6 || value.length > 22) {
      setUsername({
        value,
        changed: true,
        error: true,
      })
    } else {
      setUsername({
        value,
        changed: true,
        error: false,
      })
    }
  }

  const handlePassChange = (e) => {
    const value = e.target.value
    const prevP = password.value
    console.log(prevP)
    var length = false
    var numSL = password.error.numSL
    var specialLetter = false
    var isError = false
    if (value.length > prevP.length) {
      //insert letter
      const lastChar = value[value.length - 1]
      if (specialChars.includes(lastChar)) {
        numSL += 1
      }
    } else {
      //delete letter
      let deleteChar = prevP[prevP.length - 1]
      for (let i = 0; i < value.length; i++) {
        if (prevP[i] !== value[i]) {
          deleteChar = prevP[i]
          break
        }
      }
      if (specialChars.includes(deleteChar) && numSL === 1) {
        numSL = 0
      } else if (specialChars.includes(deleteChar) && numSL > 1) {
        numSL -= 1
      }
    }

    if (numSL === 0) {
      specialLetter = true
    }
    if (value.length < 9 || value.length > 22) {
      length = true
    } else {
      length = false
    }
    if (length || specialLetter) {
      isError = true
    }
    setPassword({
      value,
      changed: true,
      error: {
        length,
        specialLetter,
        numSL,
        isError,
      },
    })
  }

  const handleRoleChange = (event, newValue) => {
    var value = newValue
    if (value !== null) {
      setRole({
        value,
        changed: true,
        error: false,
      })
    } else {
      setRole({
        value,
        changed: true,
        error: true,
      })
    }
  }

  const handleRegister = () => {
    if (username.changed === false) {
      setUsername({
        ...username,
        changed: true,
        error: true,
      })
    }
    if (username.changed === false) {
      setPassword({
        ...password,
        changed: true,
        error: {
          length: true,
          numSL: 0,
          specialLetter: true,
          isError: true,
        },
      })
    }
    if (password.changed && username.changed && !username.error && !password.error.isError) {
      navigate('/signIn')
    }
  }

  return (
    <Grid container>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: '#2C73EB',
          height: `${window.innerHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <img src={HP} alt="" />
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(240, 242, 245)',
        }}
      >
        <Box
          component="form"
          sx={{
            width: '55%',
            '& > :not(style)': { m: 1 },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" fontWeight={700}>
            Account sign up
          </Typography>
          <Typography variant="subtitle2" align="justify" color={'#8692A6'}>
            Become a member and enjoy exclusive promotions.
          </Typography>
          <FormControl>
            <Typography variant="subtitle2">Username</Typography>
            <OutlinedInput
              placeholder="Username"
              error={username.error}
              value={username.value}
              onChange={(e) => handleUsernameChange(e)}
            ></OutlinedInput>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: `${!username.changed ? '#8692A6' : `${username.error ? 'red' : '#00b004'}`}`,
                }}
              >
                {'Length: >=6 and <=22'}
              </Typography>
            </Box>
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2">Password</Typography>
            <OutlinedInput
              placeholder="Password"
              type="password"
              error={password.error.isError}
              value={password.value}
              onChange={(e) => handlePassChange(e)}
            ></OutlinedInput>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: `${!password.changed ? '#8692A6' : `${password.error.length ? 'red' : '#00b004'}`}`,
                }}
              >
                {'Length: >=9 and <=22'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: `${!password.changed ? '#8692A6' : `${password.error.specialLetter ? 'red' : '#00b004'}`}`,
                }}
              >
                Need 1 special letter
              </Typography>
            </Box>
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2">Email</Typography>
            <OutlinedInput
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></OutlinedInput>
          </FormControl>
          <FormControl>
            <Box>
              <Typography variant="subtitle2">Gender</Typography>
              <FormGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
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
            <Box>
              <Typography variant="subtitle2">Role</Typography>
              <Autocomplete
                options={roles}
                value={role.value}
                onChange={(event, newValue) => handleRoleChange(event, newValue)}
                renderInput={(params) => <TextField {...params} placeholder="Role" />}
              />
            </Box>
          </FormControl>
          <Button variant="contained" sx={{ height: '56px' }} onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SignUp
