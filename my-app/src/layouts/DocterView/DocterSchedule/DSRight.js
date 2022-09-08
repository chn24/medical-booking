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
import { useState } from 'react'
import TRow from './TRow'
import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'

function DSRight(props) {
  const { schedules, setDeleteDate, setEditInformation } = props
  const loginData = useRecoilValue(dataState)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Box className="dsR">
      <Paper className="dsR-paper">
        <Box className="dsR-paper-head">
          <Typography variant="h5" sx={{ color: '#fff' }}>
            Schedule table
          </Typography>
        </Box>
        <Box className="dsR-paper-body">
          <TableContainer className="dsR-paper-body-table">
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.value.slice(page * 5, page * 5 + 5).map((schedule, index) => (
                  <TRow
                    key={index}
                    schedule={schedule}
                    id={index}
                    setDeleteDate={setDeleteDate}
                    setEditInformation={setEditInformation}
                  />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              component="div"
              count={schedules.value.length}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  )
}

export default DSRight
