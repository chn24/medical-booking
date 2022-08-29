import { Box, Button, TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import { BookingData } from './BookingLeft'
import logo from '../pic/logo.png'
import { useNavigate } from 'react-router-dom'

function BookingComplete(props) {
  const context = useContext(BookingData)
  const { activeStep, setActiveStep } = props
  const navigate = useNavigate()

  const handleBooking = () => {
    context.setCustomer({
      title: null,
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      phoneNumber: '',
    })
    context.setBooking({
      doctorName: {
        value: null,
        isChoosen: false,
        error: false,
      },
      date: {
        value: null,
        day: '',
        month: '',
        year: '',
        isChoosen: false,
        error: null,
      },
      time: {
        value: null,
        isChoosen: false,
        error: false,
      },
      doctorTimes: ['Morning', 'Afternoon'],
      morning: [],
      afternoon: [],
      full: [],
    })
    context.setDoctorList([])
    setActiveStep(0)
  }

  const handleHome = () => {
    navigate('/')
  }

  return (
    <Box className="bComplete">
      <Box className="bComplete-header">
        <Typography className="bComplete-header-text" variant="h5">
          Thank you for using our service
        </Typography>
        <Typography className="bComplete-header-text" variant="subtitle1">
          Here is your booking information
        </Typography>
      </Box>
      <Box className="bComplete-body">
        <Box
          className="bookg-complete-form bComplete-body-form"
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
          <Box className="bComplete-body-form-item">
            <Typography variant="h6" className="bComplete-body-form-item-title" sx={{ width: 'max-content' }}>
              Your name :{' '}
            </Typography>
            <TextField
              className="bComplete-body-form-item-detail"
              variant="standard"
              disabled
              defaultValue={`${context.customer.name}`}
            ></TextField>
          </Box>
          <Box className="bComplete-body-form-item">
            <Typography variant="h6" className="bComplete-body-form-item-title" sx={{ width: 'max-content' }}>
              Your doctor :{' '}
            </Typography>
            <TextField
              className="bComplete-body-form-item-detail"
              variant="standard"
              disabled
              defaultValue={`${context.booking.doctorName.value.name}`}
            ></TextField>
          </Box>
          <Box className="bComplete-body-form-item">
            <Typography variant="h6" className="bComplete-body-form-item-title" sx={{ width: 'max-content' }}>
              Date :{' '}
            </Typography>
            <TextField
              className="bComplete-body-form-item-detail"
              variant="standard"
              disabled
              defaultValue={`${context.booking.time.value} ${context.booking.date.day} ${context.booking.date.month} ${context.booking.date.year} 
                        `}
            ></TextField>
          </Box>
        </Box>
        <Box className="booking-mobile-dis-none" sx={{ width: '35%' }}>
          <img src={logo} alt="" style={{ width: '75%' }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={handleBooking}>Booking</Button>
        <Button onClick={handleHome}>Home</Button>
      </Box>
    </Box>
  )
}

export default BookingComplete
