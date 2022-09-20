import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'

import { alertState } from '../../../../recoil/alertState'
import { loginState } from '../../../../recoil/loginState'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import axios from 'axios'

import ComAlert from '../../../common/Alert'
import DBRow from './DBRow'
import { de } from 'date-fns/locale'

function Body() {
  const isLogin = useRecoilValue(loginState)
  const setAlertText = useSetRecoilState(alertState)
  const setDefaultAlert = useResetRecoilState(alertState)
  const [deleteAlert, setDeleteAlert] = useState(false)

  const [statusInfo, setStatusInfo] = useState()
  const [bookingSchedule, setBookingSchedule] = useState()
  const [shows, setShows] = useState()
  const [date, setDate] = useState({
    value: null,
    error: null,
  })
  const [page, setPage] = useState(0)
  const [deleteInfo, setDeleteInfo] = useState()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const callAPI = async () => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${isLogin.id}`)
    if (res.data) {
      setBookingSchedule(res.data.bookings)
      if (date.error === null && date.value === null) {
        setShows(res.data.bookings)
      }
    }
  }

  useEffect(() => {
    callAPI()
  }, [])

  //------------------------------------------------------------------------------Delete

  useEffect(() => {
    if (deleteAlert) {
      setAlertText({
        closeBtn: false,
        open: true,
        type: 'success',
        information: {
          text: 'Delete successfully',
        },
      })
      let timeOut = setTimeout(() => {
        setDefaultAlert()
        setDeleteAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [deleteAlert])

  const deleteDataApi = async () => {
    const arr = shows.filter((show) => show.id !== deleteInfo.id)
    const doctorData = {
      bookings: arr,
    }
    let userData
    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${isLogin.id}`, doctorData)
      .catch((error) => {
        console.log(error)
      })
    await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${deleteInfo.patientId}`)
      .then((response) => {
        const arr2 = response.data.dates.filter((item) => item.id != deleteInfo.id)

        userData = {
          dates: arr2,
        }
      })
      .catch((error) => {
        console.log(error)
      })
    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${deleteInfo.patientId}`, userData)
      .catch((error) => {
        console.log(error)
      })
    await callAPI().then(() => {
      setDeleteAlert(true)
    })
  }

  useEffect(() => {
    if (deleteInfo) {
      deleteDataApi()
    }
  }, [deleteInfo])

  //------------------------------------------------------------------------------Edit status

  const editStatusApi = async () => {
    let arr = [...shows]
    for (let key in arr) {
      if (arr[key].id === statusInfo.id) {
        arr[key].status += 1
      }
    }
    const doctorData = {
      bookings: arr,
    }
    let userData
    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${isLogin.id}`, doctorData)
      .catch((error) => {
        console.log(error)
      })

    await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${statusInfo.patientId}`)
      .then((response) => {
        let arr2 = [...response.data.dates]
        for (let key in arr2) {
          if (arr2[key].id === statusInfo.id) {
            console.log('1')
            arr2[key].status += 1
          }
        }
        userData = {
          dates: arr2,
        }
      })
      .catch((error) => {
        console.log(error)
      })

    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${statusInfo.patientId}`, userData)
      .catch((error) => {
        console.log(error)
      })

    await callAPI()
  }

  useEffect(() => {
    if (statusInfo) {
      editStatusApi()
    }
  }, [statusInfo])

  //------------------------------------------------------------------------------Check date

  useEffect(() => {
    if (date.error === null) {
      if (date.value === null) {
        setShows(bookingSchedule)
      } else {
        let arr = []
        let stringifyDate = moment(date.value).format('YYYY-MM-DD')
        arr = bookingSchedule.filter((item) => item.date === stringifyDate)

        setShows(arr)
        setPage(0)
      }
    }
  }, [date])

  const checkday = (newDate) => {
    return date.value === newDate
  }

  const handleDateError = (error, newValue) => {
    setDate({
      ...date,
      error,
    })
  }

  return (
    <Box className="drBs">
      <Paper className="drBs-paper">
        <Box className="drBs-paper-alert">
          <ComAlert direction="right" />
        </Box>
        <Box className="drBs-paper-header">
          <Box className="drBs-paper-header-1">
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Booking schedule
            </Typography>
          </Box>
          <Box className="drBs-paper-header-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date.value}
                onError={(error, newValue) => handleDateError(error, newValue)}
                onChange={(newValue) =>
                  setDate({
                    ...date,
                    value: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} error={date.error !== null} placeholder="Choose date" />
                )}
              />
            </LocalizationProvider>
            <Box className="drBs-paper-header-2-error">
              <Typography className="drBs-paper-header-2-error-text" variant="subtitle1">
                {date.error}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="drBS-paper-body">
          <TableContainer className="drBS-paper-body-table">
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shows === undefined ? (
                  <TableRow>
                    <TableCell align="left">
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton variant="circular" animation="wave" sx={{ width: '16px' }} />
                    </TableCell>
                  </TableRow>
                ) : shows.length === 0 ? (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>You haven't been booked yet</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ) : (
                  shows.slice(page * 5, page * 5 + 5).map((show, index) => {
                    return (
                      <DBRow
                        key={index}
                        index={index}
                        show={show}
                        deleteInfo={deleteInfo}
                        setDeleteInfo={setDeleteInfo}
                        setStatusInfo={setStatusInfo}
                      />
                    )
                  })
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              component="div"
              count={shows !== undefined ? shows.length : 0}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  )
}

export default Body
