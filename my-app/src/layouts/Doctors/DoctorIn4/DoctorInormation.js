import { Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LPNav from '../../LandingPage/LPNav'
import Main from './Main'

const star = Math.floor(Math.random() * 5) + 1
function DoctorInformation() {
  const [datas, setDatas] = useState([])

  const callApi = async () => {
    const res = await axios.get('https://62c65d1874e1381c0a5d833e.mockapi.io/user')
    if (res.data) {
      setDatas(res.data[res.data.length - 1])
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  const Height = window.innerHeight - 1
  return (
    <Box
      sx={{
        minHeight: `${Height}px`,
        backgroundColor: 'rgb(240, 242, 245)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav />
      <Main doctor={datas} star={star} />
    </Box>
  )
}

export default DoctorInformation
