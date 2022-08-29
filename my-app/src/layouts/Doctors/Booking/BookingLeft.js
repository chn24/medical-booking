import { Box, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'

import { createContext, useState } from 'react'
import BookingForm from './ValidateForm/BookingForm'
import InformationForm from './ValidateForm/InformationForm'
import BookingComplete from './BookingComplete'

export const BookingData = createContext()
const steps = ['Your Details', 'Booking']

function BookingLeft() {
  const [activeStep, setActiveStep] = useState(0)
  const [customer, setCustomer] = useState({
    title: null,
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phoneNumber: '',
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
      <Box className="bLeft">
        <Paper className="bLeft-paper">
          <Box className="bLeft-paper-head">
            <Typography variant="h5">Booking</Typography>
          </Box>
          <Box>
            <Box className="bLeft-paper-stepperBox">
              <Stepper className=" bLeft-paper-stepperBox-stepper" activeStep={activeStep}>
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
