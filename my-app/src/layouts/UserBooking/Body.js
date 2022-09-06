import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { loginState } from '../../recoil/loginState'
import BRow from './BRow'

function Body() {
  const isLogin = useRecoilValue(loginState)
  const [dates, setDates] = useState()
  const [page, setPage] = useState(0)
  const [deleteDateId, setDeleteDateId] = useState()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const callApi = async () => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${isLogin.id}`)
    if (res.data) {
      setDates(res.data.dates)
    }
  }

  const deleteDateApi = async () => {
    //----------------user
    const arr = dates.filter((date) => date.id !== deleteDateId)

    const docterId = deleteDateId.split('-')

    const userData = {
      dates: arr,
    }
    let doctorData = {}
    // console.log(docterId)
    await axios.put(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${isLogin.id}`, userData).catch((error) => {
      console.log(error)
    })
    await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${docterId[0]}`)
      .then((response) => {
        console.log(response.data.bookings)
        const arr2 = response.data.bookings.filter((item) => item.id !== deleteDateId)
        doctorData = {
          bookings: arr2,
        }
      })
      .catch((error) => {
        console.log(error)
      })
    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${docterId[0]}`, doctorData)
      .catch((error) => {
        console.log(error)
      })
    await callApi()
  }

  useEffect(() => {
    if (deleteDateId) {
      deleteDateApi()
    }
  }, [deleteDateId])

  useEffect(() => {
    callApi()
  }, [])

  return (
    <Box className="uBooking">
      <Paper className="uBooking-paper">
        <Box className="uBooking-paper-head">
          <Typography sx={{ color: '#fff' }} variant="h5">
            Your booking list
          </Typography>
        </Box>
        <Box>
          <TableContainer className="uBooking-paper-table">
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Doctor name</TableCell>
                  <TableCell align="left">Patient name</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dates === undefined ? (
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
                ) : (
                  dates.slice(page * 5, page * 5 + 5).map((date, index) => {
                    return <BRow key={date.id} index={index} date={date} setDeleteDateId={setDeleteDateId} />
                  })
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              component="div"
              count={dates !== undefined ? dates.length : 0}
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
