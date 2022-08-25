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
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { loginState } from '../../recoil/loginState'

function Body() {
  const isLogin = useRecoilValue(loginState)
  const [dates, setDates] = useState([])
  const [page, setPage] = useState(0)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const callApi = async () => {
    const res = await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${isLogin.id}`)
    if (res.data) {
      console.log(res.data)
      setDates(res.data.dates)
    }
  }

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
                </TableRow>
              </TableHead>
              <TableBody>
                {dates.slice(page * 5, page * 5 + 5).map((date) => {
                  return (
                    <TableRow key={date.id}>
                      <TableCell align="left">{date.id}</TableCell>
                      <TableCell align="left">{date.docterName}</TableCell>
                      <TableCell align="left">{date.patientName}</TableCell>
                      <TableCell align="left">{date.date}</TableCell>
                      <TableCell align="left">{date.time}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              component="div"
              count={dates.length}
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
