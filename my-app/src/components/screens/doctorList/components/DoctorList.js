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
    <Box>
      <Box>
        <Typography variant="h3">Doctor list</Typography>
      </Box>
      <Box className="dList">
        {datas.map((data, index) => (
          <DoctorRow key={index} datas={data} id={loginData.information.id} roll={loginData.roll} />
        ))}
      </Box>
    </Box>
  )
}

export default DoctorList
