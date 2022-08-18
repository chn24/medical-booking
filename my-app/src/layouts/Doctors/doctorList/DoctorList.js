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
import { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import DoctorRow from './DoctorRow'
import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'

import '../assets/scss/doctorList/responsive.scss'

const list = [
  {
    name: 'Id',
    src: '',
  },
  {
    name: 'Name',
    src: PersonIcon,
  },
  {
    name: 'Email',
    src: EmailIcon,
  },
  {
    name: 'Phone number',
    src: ContactPhoneIcon,
  },
  {
    name: '',
    src: '',
  },
]

function DoctorList() {
  const loginData = useRecoilValue(dataState)
  const [dataLoading, setDataLoading] = useState(true)
  const [loading, setLoading] = useState(true)
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

  return (
    <Box
      className="table-box"
      sx={{
        height: `max-content`,
        padding: '48px 64px 32px',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'max-content',
        }}
      >
        <Box
          sx={{
            margin: '-24px 16px 0 16px',
            padding: '24px 16px',
            opacity: '1',
            background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
            color: '#fff',
            borderRadius: '0.5rem',
            boxShadow:
              'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
          }}
        >
          <Typography variant="h6">Doctor list</Typography>
        </Box>
        <Box
          sx={{
            height: '90%',
          }}
        >
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
                  <TableCell align="left">Email</TableCell>
                  <TableCell className="mobile-hide" align="left">
                    Phone number
                  </TableCell>
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
        </Box>
      </Paper>
    </Box>
  )
}

export default DoctorList
