import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import LoadingButton from '@mui/lab/LoadingButton'
import { Autocomplete, Box, Button, FormControl, Paper, Stack, TextField, Typography } from '@mui/material'

import { dataState } from '../../../../recoil/dataState'
import { alertState } from '../../../../recoil/alertState'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { concatSchedule } from '../../../../utils/concatSchedule'

import { set } from 'date-fns'

const times = ['Morning', 'Afternoon']

function DSLeft(props) {
  const { schedules, setSchedules, bookings } = props
  const [isAlert, setIsAlert] = useState(false)
  const [alerInfo, setAlertInfo] = useState()
  const [loadingBtn, setLoadingBtn] = useState(false)

  const [loginData, setLoginData] = useRecoilState(dataState)
  const setAlertText = useSetRecoilState(alertState)
  const setDefaultAlert = useResetRecoilState(alertState)

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
  //--------------------------------------------------------------------

  useEffect(() => {
    if (isAlert) {
      setAlertText(alerInfo)
      let func = setTimeout(() => {
        setDefaultAlert()
        setIsAlert(false)
      }, 2000)
      return () => {
        clearTimeout(func)
      }
    } else {
      setDefaultAlert()
    }
  }, [isAlert])

  const handleMouseOver = (e, value) => {
    setAlertInfo(value)
    setIsAlert(true)
  }

  const handleMouseOut = () => {
    if (isAlert) {
      setIsAlert(false)
    }
  }

  //--------------------------------------------------------------------Render calendar && time

  const customDayRenderer = (date, selectedDates, pickersDayProps) => {
    const stringifiedDate = moment(date).format('YYYY-MM-DD')

    const dateCondition1 = schedules.morning.includes(stringifiedDate)

    const dateCondition2 = schedules.afternoon.includes(stringifiedDate)

    const dateCondition3 = schedules.full.includes(stringifiedDate)

    const timeCondition1 = bookings.some((item) => item.date === stringifiedDate && item.time === 'Morning')

    const timeCondition2 = bookings.some((item) => item.date === stringifiedDate && item.time === 'Afternoon')

    if (
      dateCondition3 ||
      (timeCondition1 && timeCondition2) ||
      (dateCondition1 && timeCondition2) ||
      (dateCondition2 && timeCondition1)
    ) {
      let value

      if (dateCondition3) {
        value = {
          closeBtn: false,
          open: true,
          type: 'info',
          information: {
            text: 'You are busy this day',
          },
        }
      } else {
        const morningInfo = `${
          dateCondition1 || timeCondition1
            ? ` You have ${dateCondition1 ? 'busy Schedule' : ''}${timeCondition1 ? 'been booked' : ''} in the morning`
            : ''
        } `
        const afternoonInfo = `${
          dateCondition2 || timeCondition2
            ? `You have ${dateCondition2 ? 'busy Schedule' : ''}${timeCondition2 ? 'been booked' : ''} in the afternoon`
            : ''
        } `
        value = {
          closeBtn: false,
          open: true,
          type: 'info',
          information: {
            morningInfo,
            afternoonInfo,
          },
        }
      }

      // setAlertText({
      //   morningInfo,
      //   afternoonInfo,
      // })
      return (
        <PickersDay
          {...pickersDayProps}
          className="pointerENone"
          onMouseOver={(e, values = value) => handleMouseOver(e, value)}
          onMouseOut={handleMouseOut}
        />
      )
    }
    return <PickersDay {...pickersDayProps} />
  }

  useEffect(() => {
    if (DSFdate.value !== null) {
      const stringifiedDate = moment(DSFdate.value).format('YYYY-MM-DD')

      let timesArr = ['Morning', 'Afternoon']

      const timeCondition1 = bookings.some((item) => item.date === stringifiedDate && item.time === 'Morning')

      const timeCondition2 = bookings.some((item) => item.date === stringifiedDate && item.time === 'Afternoon')
      if (schedules.morning.includes(stringifiedDate) || timeCondition1) {
        timesArr.splice(timesArr.indexOf('Morning'), 1)
      }
      if (schedules.afternoon.includes(stringifiedDate) || timeCondition2) {
        timesArr.splice(timesArr.indexOf('Afternoon'), 1)
      }
      setTimeTable(timesArr)
    }
    return () => {
      setTimeTable()
    }
  }, [DSFdate])

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

    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`, data)
      .then(() => {
        let value = {
          closeBtn: false,
          open: true,
          type: 'success',
          information: {
            text: 'Submit complete',
          },
        }

        setLoadingBtn(false)
        setAlertInfo(value)
        setIsAlert(true)
      })
      .catch((error) => {
        let value = {
          closeBtn: false,
          open: true,
          type: 'error',
          information: {
            text: 'Submit failed',
          },
        }

        setLoadingBtn(false)
        setAlertInfo(value)
        setIsAlert(true)
        console.log(error)
      })

    await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`)
      .then((res) => {
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

        setSchedules({
          value: array,
          full: fullArr,
          morning: morningArr,
          afternoon: afternoonArr,
        })

        setLoginData({
          ...loginData,
          schedule: {
            value: array,
            full: fullArr,
            morning: morningArr,
            afternoon: afternoonArr,
          },
        })
      })
      .catch((error) => {
        console.log(error)
      })
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
      setLoadingBtn(true)
      const stringifiedDate = moment(DSFdate.value).format('YYYY-MM-DD')
      let fullArr = [...schedules.full]
      let morningArr = [...schedules.morning]
      let afternoonArr = [...schedules.afternoon]
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
    <Box className="dsL">
      <Paper className="dsL-paper">
        <Box className="dsL-paper-head">
          <Typography className="dsL-paper-head-typography" variant="h5" sx={{ color: '#fff' }}>
            New busy schedule
          </Typography>
        </Box>

        <Box className="dsL-paper-body">
          <Box
            component="form"
            className="dsL-paper-body-form"
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl className="dsL-paper-body-form-item">
              <Stack>
                <Typography variant="subtitle1">Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="aaaaa"
                    value={DSFdate.value}
                    onError={(error, newValue) => handleDSFdateError(error, newValue)}
                    disablePast
                    onChange={(newValue) => handleDSFdateChange(newValue)}
                    renderInput={(params) => <TextField {...params} error={DSFdate.error !== null} />}
                    renderDay={customDayRenderer}
                  />
                </LocalizationProvider>
                <Box className="dsL-paper-body-form-item-error">
                  <Typography className="error-text" variant="caption">
                    {DSFdate.error === null ? '' : `*${DSFdate.error}`}
                  </Typography>
                </Box>
              </Stack>
            </FormControl>
            <FormControl className="dsL-paper-body-form-item">
              <Stack>
                <Typography variant="subtitle1">Time</Typography>
                <Autocomplete
                  disabled={DSFdate.error !== null || !DSFdate.choosen}
                  options={timeTable}
                  value={DSFtime.value}
                  onChange={(event, newValue) => handleDFStimeChange(event, newValue)}
                  renderInput={(params) => <TextField {...params} error={DSFtime.error} placeholder="Time" />}
                />
                <Box className="dsL-paper-body-form-item-error">
                  <Typography
                    className="error-text"
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
            <Box className="dsL-paper-body-form-buttonBox">
              <Button variant="contained" onClick={handleClear}>
                Clear
              </Button>
              <LoadingButton variant="contained" loading={loadingBtn} onClick={handleSubmit}>
                Submit
              </LoadingButton>
              {/* <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default DSLeft
