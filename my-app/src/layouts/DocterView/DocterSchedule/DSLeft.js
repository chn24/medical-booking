import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import moment from 'moment'
import { Autocomplete, Box, Button, FormControl, Paper, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { dataState } from '../../../recoil/dataState'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { concatSchedule } from '../../../function/concatSchedule'

const times = ['Morning', 'Afternoon']

function DSLeft() {
  const [loginData, setLoginData] = useRecoilState(dataState)

  const [DSFdate, setDSFdate] = useState({
    value: null,
    choosen: false,
    error: null,
  })

  const [DSFtime, setDSFtime] = useState({
    value: null,
    choosen: false,
    error: false,
  })

  const [timeTable, setTimeTable] = useState(times)

  //--------------------------------------------------------------------Render calendar && time

  const customDayRenderer = (date, selectedDates, pickersDayProps) => {
    const stringifiedDate = moment(date).format('YYYY-MM-DD')
    if (loginData.schedule.full.includes(stringifiedDate)) {
      return <PickersDay {...pickersDayProps} disabled />
    }
    return <PickersDay {...pickersDayProps} />
  }

  useEffect(() => {
    if (DSFdate.value !== null) {
      const stringifiedDate = moment(DSFdate.value).format('YYYY-MM-DD')
      var timesArr = []
      if (loginData.schedule.morning.includes(stringifiedDate)) {
        timesArr = ['Afternoon']
      } else if (loginData.schedule.afternoon.includes(stringifiedDate)) {
        timesArr = ['Morning']
      } else {
        timesArr = times
      }
      setTimeTable(timesArr)
    }
  }, [DSFtime])

  //--------------------------------------------------------------------Handle changes

  const handleDSFdateChange = (newValue) => {
    if (newValue === 'Invalid Date') {
      setDSFdate({
        ...DSFdate,
        value: newValue,
        choosen: true,
      })
    } else if (newValue === null && DSFdate.error === null) {
      setDSFdate({
        error: 'Required',
        value: newValue,
        choosen: true,
      })
    } else if (newValue !== null && DSFdate.error === 'Required') {
      setDSFdate({
        value: newValue,
        error: null,
        choosen: true,
      })
    } else {
      setDSFdate({
        ...DSFdate,
        value: newValue,
        choosen: true,
      })
    }
    setDSFtime({
      value: null,
      choosen: false,
      error: false,
    })
  }

  const handleDSFdateError = (error, newValue) => {
    if (error === null) {
      setDSFdate({
        ...DSFdate,
        error: 'Required',
      })
    } else {
      setDSFdate({
        ...DSFdate,
        error,
      })
    }
  }

  const handleDFStimeChange = (event, newValue) => {
    var error = false
    if (newValue === null) {
      error = true
    }
    setDSFtime({
      value: newValue,
      choosen: true,
      error,
    })
  }

  //--------------------------------------------------------------------Handle click button

  const handleClear = () => {
    setDSFdate({
      value: null,
      choosen: false,
      error: null,
    })
    setDSFtime({
      value: null,
      choosen: false,
      error: false,
    })
  }

  const putSchedlue = async (arr) => {
    let data = {
      dates: arr,
    }

    const put = await axios.put(
      `https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`,
      data,
    )
    const res = await axios.get(
      `https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`,
    )
    if (res.data) {
      let array = res.data.dates
      let fullArr = []
      let morningArr = []
      let afternoonArr = []
      for (let key in array) {
        switch (array[key].time) {
          case 'Full':
            fullArr.splice(fullArr.length, 0, array[key].date)
            break
          case 'Morning':
            morningArr.splice(morningArr.length, 0, array[key].date)
            break
          default:
            afternoonArr.splice(afternoonArr.length, 0, array[key].date)
            break
        }
      }

      setLoginData({
        ...loginData,
        schedule: {
          value: array,
          full: fullArr,
          morning: morningArr,
          afternoon: afternoonArr,
        },
      })
    }
  }

  const handleSubmit = () => {
    if (!DSFdate.choosen) {
      setDSFdate({
        ...DSFdate,
        choosen: true,
        error: 'Required',
      })
    }
    if (!DSFtime.choosen && DSFdate.error === null && DSFdate.choosen) {
      setDSFtime({
        ...DSFtime,
        choosen: true,
        error: true,
      })
    }
    if (DSFtime.choosen && !DSFtime.error && DSFdate.choosen && !DSFdate.error) {
      const stringifiedDate = moment(DSFdate.value).format('YYYY-MM-DD')
      let fullArr = [...loginData.schedule.full]
      let morningArr = [...loginData.schedule.morning]
      let afternoonArr = [...loginData.schedule.afternoon]
      let valueArr = []
      if (DSFtime.value === 'Afternoon') {
        let index = morningArr.indexOf(stringifiedDate)
        if (index >= 0) {
          morningArr.splice(index, 1)
          fullArr.splice(fullArr.length, 0, stringifiedDate)
        } else {
          afternoonArr.splice(afternoonArr.length, 0, stringifiedDate)
        }
      } else if (DSFtime.value === 'Morning') {
        let index = afternoonArr.indexOf(stringifiedDate)
        if (index >= 0) {
          afternoonArr.splice(index, 1)
          fullArr.splice(fullArr.length, 0, stringifiedDate)
        } else {
          morningArr.splice(morningArr.length, 0, stringifiedDate)
        }
      }

      valueArr = concatSchedule(fullArr, morningArr, afternoonArr)

      putSchedlue(valueArr)

      setDSFdate({
        value: null,
        choosen: false,
        error: null,
      })
      setDSFtime({
        value: null,
        choosen: false,
        error: false,
      })
    }
  }

  return (
    <Box>
      <Paper
        className="dsL-paper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
        }}
      >
        <Box
          className="dsL-headBox"
          sx={{
            margin: '-24px 16px 0 16px',
            padding: '24px 16px',
            opacity: '1',
            background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
            color: 'rgb(52, 71, 103)',
            borderRadius: '0.5rem',
            boxShadow:
              'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
          }}
        >
          <Typography className="dsL-headBox-typography" variant="h5" sx={{ color: '#fff' }}>
            New schedule
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '16px',
          }}
        >
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl
              sx={{
                width: '80%',
              }}
            >
              <Stack>
                <Typography variant="subtitle1">Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={DSFdate.value}
                    onError={(error, newValue) => handleDSFdateError(error, newValue)}
                    disablePast
                    onChange={(newValue) => handleDSFdateChange(newValue)}
                    renderInput={(params) => <TextField {...params} error={DSFdate.error !== null} />}
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
                    {DSFdate.error === null ? '' : `*${DSFdate.error}`}
                  </Typography>
                </Box>
              </Stack>
            </FormControl>
            <FormControl
              sx={{
                width: '80%',
              }}
            >
              <Stack>
                <Typography variant="subtitle1">Time</Typography>
                <Autocomplete
                  disabled={DSFdate.error !== null || !DSFdate.choosen}
                  options={timeTable}
                  value={DSFtime.value}
                  onChange={(event, newValue) => handleDFStimeChange(event, newValue)}
                  renderInput={(params) => <TextField {...params} error={DSFtime.error} placeholder="Time" />}
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
                    {DSFtime.error ? '*Required' : ''}
                  </Typography>
                </Box>
              </Stack>
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '80%',
              }}
            >
              <Button variant="contained" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default DSLeft
