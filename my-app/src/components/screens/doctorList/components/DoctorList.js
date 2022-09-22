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
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { dataState } from '../../../../recoil/dataState'

import DoctorRow from './DoctorRow'
import ComBox from '../../../common/ComBox'

function DoctorList() {
  const loginData = useRecoilValue(dataState)
  const [datas, setDatas] = useState([])

  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const doctorInfor = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    if (res.data) {
      setDatas(res.data)
    }
  }

  useEffect(() => {
    doctorInfor()
  }, [])

  const data = {
    title: 'Doctor list',
    aHalf: true,
  }

  return (
    <Box className="table-box dList">
      <ComBox data={data}>
        {
          <TableContainer
            className="dList-paper-body-table"
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
                  <TableCell className="mobile-hide" align="left">
                    Email
                  </TableCell>
                  <TableCell align="left">Rating</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loginData.roll === '' ? (
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
                  </TableRow>
                ) : (
                  <>
                    {datas.slice(page * 5, page * 5 + 5).map((data, index) => (
                      <DoctorRow key={index} datas={data} id={loginData.information.id} roll={loginData.roll} />
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              component="div"
              count={datas.length}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableContainer>
        }
      </ComBox>
    </Box>
  )
}

export default DoctorList
