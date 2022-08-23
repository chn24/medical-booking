import {
  Box,
  Paper,
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
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import moment from 'moment'

import { loginState } from '../../../recoil/loginState'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { set } from 'date-fns'

import './assets/scss/responsive.scss'

function Body() {
  const isLogin = useRecoilValue(loginState)
  const [bookingSchedule, setBookingSchedule] = useState([])
  const [shows, setShows] = useState([])
  const [date, setDate] = useState({
    value: null,
    error: null,
  })
  const [page, setPage] = useState(0)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const callAPI = async () => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${isLogin.id}`)
    if (res.data) {
      console.log(res.data.bookings)
      setBookingSchedule(res.data.bookings)
      if (date.error === null && date.value === null) {
        setShows(res.data.bookings)
      }
    }
  }

  useEffect(() => {
    callAPI()
  }, [])

  useEffect(() => {
    console.log(date.value)
    if (date.error === null) {
      if (date.value === null) {
        console.log('1')
        setShows(bookingSchedule)
      } else {
        let arr = []
        let stringifyDate = moment(date.value).format('YYYY-MM-DD')
        for (let key in bookingSchedule) {
          if (bookingSchedule[key].date === stringifyDate) {
            arr.push(bookingSchedule[key])
          }
        }
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

  console.log(shows)

  return (
    <Box
      sx={{
        marginTop: '32px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
        }}
      >
        <Box
          className="bsBox-header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            className="bsBox-header-1"
            sx={{
              width: '45%',
              maxHeight: '80px',
              margin: '-24px 0 0 16px',
              padding: '24px 16px',
              boxSizing: 'border-box',
              opacity: '1',
              background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
              color: 'rgb(52, 71, 103)',
              borderRadius: '0.5rem',
              boxShadow:
                'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
            }}
          >
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Booking schedule
            </Typography>
          </Box>
          <Box
            className="bsBox-header-2"
            sx={{
              margin: '16px 16px 16px 0',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date.value}
                onError={(error, newValue) => handleDateError(error, newValue)}
                disablePast
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
            <Box
              sx={{
                height: '28px',
              }}
            >
              <Typography variant="subtitle1">{date.error}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <TableContainer
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shows.slice(page * 5, page * 5 + 5).map((show, index) => {
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{show.patientName}</TableCell>
                      <TableCell align="left">{show.date}</TableCell>
                      <TableCell align="left">{show.time}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              component="div"
              count={shows.length}
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
