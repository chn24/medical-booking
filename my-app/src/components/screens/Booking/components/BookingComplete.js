import { Box, Button, TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import { BookingData } from './BookingLeft'
import logo from '../../../../assets/image/logo.png'
import { useNavigate } from 'react-router-dom'

import { bookingState } from '../../../../recoil/bookingState'
import { useRecoilValue, useResetRecoilState } from 'recoil'

function BookingComplete(props) {
  const context = useContext(BookingData)
  const bookingIn4 = useRecoilValue(bookingState)
  const resetBooking = useResetRecoilState(bookingState)
  const { activeStep, setActiveStep } = props
  const navigate = useNavigate()

  const handleBooking = () => {
    resetBooking()
    context.setDoctorList([])
    setActiveStep(0)
  }

  const handleHome = () => {
    resetBooking()
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
              defaultValue={`${bookingIn4.customer.name}`}
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
              defaultValue={`${bookingIn4.booking.doctorName.value.name}`}
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
              defaultValue={`${bookingIn4.booking.time.value} ${bookingIn4.booking.date.day} ${bookingIn4.booking.date.month} ${bookingIn4.booking.date.year} 
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
