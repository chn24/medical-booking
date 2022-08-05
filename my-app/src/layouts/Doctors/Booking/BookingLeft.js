import { Divider, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { createContext, useState } from 'react'
import BookingForm from './ValidateForm/BookingForm'
import InformationForm from './ValidateForm/InformationForm'
import BookingComplete from './BookingComplete'

export const BookingData = createContext()
const steps = ['Your Details', 'Booking']

function BookingLeft() {
  const [activeStep, setActiveStep] = useState(0)
  const [customer, setCustomer] = useState({
    title: '',
    firstName: {
      value: '',
      isChanged: false,
      error: false,
    },
    lastName: {
      value: '',
      isChanged: false,
      error: false,
    },
    name: '',
    email: '',
    phoneNumber: {
      value: '',
      isChanged: false,
      error: {
        isError: false,
        required: false,
        justNumber: false,
        notNum: 0,
        length: false,
      },
    },
  })
  const [booking, setBooking] = useState({
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
  const [doctorList, setDoctorList] = useState([])

  return (
    <BookingData.Provider
      value={{
        customer,
        setCustomer,
        booking,
        setBooking,
        doctorList,
        setDoctorList,
      }}
    >
      <Box>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '95%',
          }}
        >
          <Box
            sx={{
              margin: '-35px 16px 0 16px',
              padding: '24px 16px',
              opacity: '1',
              background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
              color: '#fff',
              borderRadius: '0.5rem',
              boxShadow:
                'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
            }}
          >
            <Typography variant="h5">Booking</Typography>
          </Box>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '32px 0',
              }}
            >
              <Stepper
                activeStep={activeStep}
                sx={{
                  width: '70%',
                  textAlign: 'center',
                }}
              >
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Box>
            <Divider variant="middle" />
            {activeStep === 0 ? (
              <InformationForm activeStep={activeStep} setActiveStep={setActiveStep} />
            ) : activeStep === 1 ? (
              <BookingForm activeStep={activeStep} setActiveStep={setActiveStep} />
            ) : (
              <BookingComplete activeStep={activeStep} setActiveStep={setActiveStep} />
            )}
          </Box>
        </Paper>
      </Box>
    </BookingData.Provider>
  )
}

export default BookingLeft
