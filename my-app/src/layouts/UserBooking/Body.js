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
    <Box
      sx={{
        marginTop: '32px',
        padding: '0 32px',
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
          sx={{
            width: '90%',
            maxHeight: '80px',
            margin: '-24px 5% 0 5%',
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
          <Typography variant="h5">Your booking list</Typography>
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
