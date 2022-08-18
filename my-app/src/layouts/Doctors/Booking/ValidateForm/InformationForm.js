import { Autocomplete, Box, Button, FormControl, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import styles from '../assets/InformationForm.scss'
import { BookingData } from '../BookingLeft'

// import '../../assets/scss/booking/responsive.scss'

const titleList = ['Mr', 'Mrs']
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function InformationForm(props) {
  const context = useContext(BookingData)
  const { activeStep, setActiveStep } = props

  const [title, setTitle] = useState(context.customer.title)
  const [firstName, setFirstName] = useState(context.customer.firstName)
  const [lastName, setLastName] = useState(context.customer.lastName)
  const [phoneNumber, setPhoneNumber] = useState(context.customer.phoneNumber)
  const [email, setEmail] = useState(context.customer.email)

  const handleFNChange = (value) => {
    var error = false
    if (value.length === 0) {
      error = true
    }
    setFirstName({
      value,
      isChanged: true,
      error,
    })
  }

  const handleLNChange = (value) => {
    var error = false
    if (value.length === 0) {
      error = true
    }
    setLastName({
      value,
      isChanged: true,
      error,
    })
  }

  const handlePhoneChange = (value) => {
    const prevPN = phoneNumber.value
    var required = false
    var justNumber = false
    var notNum = phoneNumber.error.notNum
    var isError = false
    var length = false
    if (value.length > prevPN.length) {
      //insert
      var addNum = value[value.length - 1]
      for (let i = 0; i < prevPN.length; i++) {
        if (value[i] !== prevPN[i]) {
          addNum = value[i]
          break
        }
      }
      if (numbers.indexOf(addNum) < 0) {
        notNum += 1
      }
    } else {
      //delete
      var deleteNum = prevPN[prevPN.length - 1]
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== prevPN[i]) {
          deleteNum = prevPN[i]
          break
        }
      }
      if (numbers.indexOf(deleteNum) < 0) {
        notNum -= 1
      }
    }

    if (value.length < 9 || value.length > 10) {
      length = true
      isError = true
    }
    if (value.length === 0) {
      required = true
      isError = true
    }
    if (notNum > 0) {
      justNumber = true
      isError = true
    }

    setPhoneNumber({
      value,
      isChanged: true,
      error: {
        isError,
        required,
        justNumber,
        notNum,
        length,
      },
    })
  }

  const handleClick = () => {
    if (!phoneNumber.isChanged) {
      setPhoneNumber({
        ...phoneNumber,
        isChanged: true,
        error: {
          isError: true,
          required: true,
          justNumber: false,
          notNum: 0,
          length: true,
        },
      })
    }
    if (!firstName.isChanged) {
      setFirstName({
        ...firstName,
        isChanged: true,
        error: true,
      })
    }
    if (!lastName.isChanged) {
      setLastName({
        ...lastName,
        isChanged: true,
        error: true,
      })
    }
    if (
      !firstName.error &&
      firstName.isChanged &&
      !lastName.error &&
      lastName.isChanged &&
      !phoneNumber.error.isError &&
      phoneNumber.isChanged
    ) {
      context.setCustomer({
        title,
        firstName,
        lastName,
        name: `${firstName.value} ${lastName.value}`,
        email,
        phoneNumber,
      })
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  return (
    <Box
      sx={{
        padding: '16px ',
        boxSizing: 'border-box',
      }}
    >
      <Box>
        <Typography variant="h5">Your Details</Typography>
      </Box>
      <Box
        className="b-container"
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          position: 'relative',
          // display:'flex',
          // flexDirection: 'column'
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl
          className="b-item margin1"
          sx={{
            boxSizing: 'border-box',
            width: '20%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Title</Typography>
            <Autocomplete
              options={titleList}
              value={title === '' ? null : title}
              onChange={(event, newValue) => {
                setTitle(newValue)
              }}
              renderInput={(params) => <TextField {...params} placeholder="Title" />}
            />
          </Stack>
        </FormControl>
        <FormControl
          className="b-item margin1"
          sx={{
            boxSizing: 'border-box',
            width: '37%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">First Name</Typography>
            <OutlinedInput
              error={firstName.error}
              placeholder="First Name"
              value={firstName.value}
              onChange={(e) => handleFNChange(e.target.value)}
            />
            <Box
              sx={{
                height: '24px',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'red',
                }}
              >
                {firstName.error ? '*Reuired' : ''}
              </Typography>
            </Box>
          </Stack>
        </FormControl>
        <FormControl
          className="b-item margin1"
          sx={{
            boxSizing: 'border-box',
            width: '37%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Last Name</Typography>
            <OutlinedInput
              error={lastName.error}
              placeholder="Last Name"
              value={lastName.value}
              onChange={(e) => handleLNChange(e.target.value)}
            />
            <Box
              sx={{
                height: '24px',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'red',
                }}
              >
                {lastName.error ? '*Reuired' : ''}
              </Typography>
            </Box>
          </Stack>
        </FormControl>
        <FormControl
          className="b-item margin1"
          sx={{
            boxSizing: 'border-box',
            width: '98%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Email</Typography>
            <OutlinedInput placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Stack>
        </FormControl>
        <FormControl
          className="b-item margin1"
          sx={{
            width: '50%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Phone Number</Typography>
            <OutlinedInput
              error={phoneNumber.error.isError}
              placeholder="Phone Number"
              value={phoneNumber.value}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '40px',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'red',
                }}
              >
                {phoneNumber.error.required
                  ? '*Required'
                  : `${phoneNumber.error.length ? '*Length : >=9 and <= 10' : ''}`}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'red',
                }}
              >
                {phoneNumber.error.justNumber ? '*Just number' : ''}
              </Typography>
            </Box>
          </Stack>
        </FormControl>
        <FormControl
          className="form-btn"
          sx={{
            position: 'absolute',
            right: '1%',
            bottom: '1%',
          }}
        >
          <Button variant="contained" onClick={handleClick}>
            Next
          </Button>
        </FormControl>
      </Box>
    </Box>
  )
}

export default InformationForm
