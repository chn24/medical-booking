import { Box, Button, FormControl, Grid } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LPNav from '../../LandingPage/LPNav'
import DSLeft from './DSLeft'
import DSRight from './DSRight'
import ResDialog from './ResDialog'
import LoadingPage from '../../LoadingPage'

import { loginState } from '../../../recoil/loginState'
import { useRecoilValue } from 'recoil'

function Body() {
  const [openDialog, setOpenDialog] = useState(false)
  const [schedules, setSchedules] = useState()
  const isLogin = useRecoilValue(loginState)

  const getSchedule = async () => {
    await axios.get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${isLogin.id}`).then((response) => {
      let arr = response.data.dates
      let fullArr = []
      let morningArr = []
      let afternoonArr = []
      for (let key in arr) {
        switch (arr[key].time) {
          case 'Full':
            fullArr.splice(fullArr.length, 0, arr[key].date)
            break
          case 'Morning':
            morningArr.splice(morningArr.length, 0, arr[key].date)
            break
          default:
            afternoonArr.splice(afternoonArr.length, 0, arr[key].date)
            break
        }
      }
      setSchedules({
        value: response.data.dates,
        full: fullArr,
        morning: morningArr,
        afternoon: afternoonArr,
      })
    })
  }

  useEffect(() => {
    getSchedule()
  }, [])

  if (schedules === undefined) {
    return <LoadingPage />
  }

  return (
    <Box
      className="ds-body"
      sx={{
        height: `max-content`,
        padding: '48px 64px 0',
      }}
    >
      <Box
        className="ds-body-container"
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          className="mobileDisplay"
          sx={{
            marginBottom: '32px',
            width: 'max-content',
            display: 'none',
          }}
          onClick={() => setOpenDialog(true)}
        >
          Add new schedule
        </Button>
        <ResDialog open={openDialog} setOpen={setOpenDialog} />
        <Box
          className="ds-body-item ds-body-item-disNone"
          sx={{
            width: '33%',
          }}
        >
          <DSLeft schedules={schedules} setSchedules={setSchedules} />
        </Box>
        <Box
          className="ds-body-item"
          sx={{
            width: '67%',
          }}
        >
          <DSRight schedules={schedules} setSchedules={setSchedules} />
        </Box>
      </Box>
    </Box>
  )
}

export default Body
