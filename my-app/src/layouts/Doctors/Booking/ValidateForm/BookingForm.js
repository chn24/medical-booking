import { Autocomplete, Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BookingData } from '../BookingLeft'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import moment from 'moment'

const times = ['Morning', 'Afternoon']

function BookingForm(props) {
  const context = useContext(BookingData)
  const { activeStep, setActiveStep } = props
  const [doctorName, setDoctorName] = useState(context.booking.doctorName)
  const [time, setTime] = useState(context.booking.time)
  const [date, setDate] = useState(context.booking.date)
  const [doctorTimes, setDoctorTimes] = useState(context.booking.doctorTimes)
  const [full, setFull] = useState(context.booking.full)
  const [morning, setMorning] = useState(context.booking.morning)
  const [afternoon, setAfternoon] = useState(context.booking.afternoon)

  // console.log(parseInt(moment(value).format("DD")));
  // console.log(moment(value).format('dddd MMMM DD YYYY'));

  //----------------------------------------------------------------------render

  const customDayRenderer = (date, selectedDates, pickersDayProps) => {
    const stringifiedDate = moment(date).format('YYYY-MM-DD')
    if (full.includes(stringifiedDate)) {
      return <PickersDay {...pickersDayProps} disabled />
    }
    return <PickersDay {...pickersDayProps} />
  }

  const defaultProps = {
    options: context.doctorList,
    getOptionLabel: (option) => option.name,
  }

  //----------------------------------------------------------------------get data

  const doctorInfor = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    if (res.data) {
      var arr = []
      for (let key in res.data) {
        arr.splice(key, 0, res.data[key])
      }
      context.setDoctorList(arr)
    }
  }

  useEffect(() => {
    if (context.doctorList.length === 0) {
      doctorInfor()
    }
  }, [])

  const doctorSchedule = async () => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${doctorName.value.id}`)
    if (res.data) {
      var arr = res.data.dates
      var fullArr = []
      var morningArr = []
      var afternoonArr = []
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
      setFull(fullArr)
      setMorning(morningArr)
      setAfternoon(afternoonArr)
    }
  }

  const handleDoctorChange = (event, newValue) => {
    var error = false
    newValue === null ? (error = true) : (error = false)
    setDoctorName({
      value: newValue,
      isChoosen: true,
      error,
    })
    setDate({
      value: null,
      day: '',
      month: '',
      year: '',
      isChoosen: false,
      error: null,
    })
    setTime({
      value: null,
      isChoosen: false,
      error: false,
    })
  }

  useEffect(() => {
    //handle change doctor schedule api
    if (doctorName.isChoosen && doctorName.value !== null) {
      doctorSchedule()
    }
  }, [doctorName])

  useEffect(() => {
    if (date.value !== null) {
      const stringifiedDate = moment(date.value).format('YYYY-MM-DD')
      var timesArr = []
      if (morning.includes(stringifiedDate)) {
        timesArr = ['Afternoon']
      } else if (afternoon.includes(stringifiedDate)) {
        timesArr = ['Morning']
      } else {
        timesArr = times
      }
      setDoctorTimes(timesArr)
    }
  }, [time])

  //----------------------------------------------------------------------validate

  const handleDateChange = (newValue) => {
    if (newValue === 'Invalid Date') {
      setDate({
        value: newValue,
        day: '',
        month: '',
        year: '',
        isChoosen: true,
      })
    } else if (newValue === null && date.error === null) {
      setDate({
        error: 'Required',
        value: newValue,
        day: '',
        month: '',
        year: '',
        isChoosen: true,
      })
    } else if (newValue !== null && date.error === 'Required') {
      setDate({
        error: null,
        value: newValue,
        day: moment(newValue).format('DD'),
        month: moment(newValue).format('MMMM'),
        year: moment(newValue).format('YYYY'),
        isChoosen: true,
      })
    } else {
      setDate({
        ...date,
        value: newValue,
        day: moment(newValue).format('DD'),
        month: moment(newValue).format('MMMM'),
        year: moment(newValue).format('YYYY'),
        isChoosen: true,
      })
    }
    setTime({
      value: null,
      isChoosen: false,
      error: false,
    })
  }

  const handleDateError = (error, newValue) => {
    if (error === 'invalidDate') {
      setDate({
        ...date,
        error,
      })
    } else if (error === null) {
      setDate({
        ...date,
        error: 'Required',
      })
    } else {
      setDate({
        ...date,
        error,
      })
    }
  }

  const handleTimeChange = (event, newValue) => {
    var error = false
    if (newValue === null) {
      error = true
    }
    setTime({
      value: newValue,
      error,
      isChoosen: true,
    })
  }

  //button action

  const pushBooking = async () => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${doctorName.value.id}`)
    if (res.data) {
      let arr = [...res.data.bookings]
      arr.splice(arr.length, 0, {
        docterId: doctorName.value.id,
        patientName: context.customer.name,
        date: date.value,
        time: time.value,
        id: arr.length + 1,
      })
      const data = {
        bookings: arr,
      }
      const put = await axios.put(
        `https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${doctorName.value.id}`,
        data,
      )
      console.log(arr)
    }
    // const push = await axios.put()
  }

  const handleBack = () => {
    context.setBooking({
      doctorName,
      date,
      time,
      doctorTimes,
      morning,
      afternoon,
      full,
    })
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleFinish = () => {
    if (
      doctorName.isChoosen &&
      !doctorName.error &&
      date.isChoosen &&
      date.error === null &&
      time.isChoosen &&
      !time.error
    ) {
      pushBooking()
      context.setBooking({
        doctorName,
        date,
        time,
      })
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      if (!doctorName.isChoosen) {
        setDoctorName({
          ...doctorName,
          isChoosen: true,
          error: true,
        })
      } else if (doctorName.isChoosen && !doctorName.error) {
        if (!date.isChoosen) {
          setDate({
            ...date,
            isChoosen: true,
            error: 'Required',
          })
        } else if (date.isChoosen && date.error === null) {
          if (!time.isChoosen) {
            setTime({
              ...time,
              error: true,
              isChoosen: true,
            })
          }
        }
      }
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
        <Typography variant="h5">Doctor Booking</Typography>
      </Box>
      <Box
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
          sx={{
            width: '50%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Doctors</Typography>
            <Autocomplete
              {...defaultProps}
              value={doctorName.value}
              onChange={(event, newValue) => handleDoctorChange(event, newValue)}
              renderInput={(params) => <TextField {...params} error={doctorName.error} placeholder="Doctors" />}
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
                {doctorName.error ? '*Required' : ''}
              </Typography>
            </Box>
          </Stack>
        </FormControl>
        <FormControl
          sx={{
            width: '40%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Choose Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={doctorName.value === null || doctorName.value === ''}
                value={date.value}
                onError={(error, newValue) => handleDateError(error, newValue)}
                disablePast
                onChange={(newValue) => handleDateChange(newValue)}
                renderInput={(params) => <TextField {...params} error={date.error !== null} />}
                renderDay={customDayRenderer}
              />
            </LocalizationProvider>
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
                {date.error !== null ? `*${date.error}` : ''}
              </Typography>
            </Box>
          </Stack>
        </FormControl>
        <FormControl
          sx={{
            width: '30%',
          }}
        >
          <Stack>
            <Typography variant="subtitle1">Time</Typography>
            <Autocomplete
              disabled={date.error !== null || !date.isChoosen}
              options={doctorTimes}
              value={time.value}
              onChange={(event, newValue) => handleTimeChange(event, newValue)}
              renderInput={(params) => <TextField {...params} error={time.error} placeholder="Times" />}
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
                {time.error ? '*Required' : ''}
              </Typography>
            </Box>
          </Stack>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleFinish}>
            Finish
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BookingForm
