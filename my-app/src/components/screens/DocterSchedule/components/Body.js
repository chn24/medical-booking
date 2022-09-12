import axios from 'axios'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { concatSchedule } from '../../../../utils/concatSchedule'

import DSLeft from './DSLeft'
import DSRight from './DSRight'
import ResDialog from './ResDialog'
import ComAlert from '../../../common/Alert'
import LoadingPage from '../../../common/LoadingPage'

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { alertState } from '../../../../recoil/alertState'
import { loginState } from '../../../../recoil/loginState'

function Body() {
  const [openDialog, setOpenDialog] = useState(false)
  const [schedules, setSchedules] = useState()
  const [bookings, setBookings] = useState()
  const [deleteDate, setDeleteDate] = useState('')
  const [editInformation, setEditInformation] = useState('')
  const [alert, setAlert] = useState(false)
  const [type, setType] = useState()

  const isLogin = useRecoilValue(loginState)
  const setAlertText = useSetRecoilState(alertState)
  const setDefaultAlert = useResetRecoilState(alertState)

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
      setBookings(response.data.bookings)
    })
  }

  useEffect(() => {
    getSchedule()
  }, [])

  useEffect(() => {
    if (alert) {
      setAlertText({
        closeBtn: false,
        open: true,
        type: 'success',
        information: {
          text: `${type} successfully`,
        },
      })
      let timeOut = setTimeout(() => {
        setDefaultAlert()
        setAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [alert])

  const putSchedlues = async (arr) => {
    const data = {
      dates: arr,
    }
    await axios.put(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${isLogin.id}`, data).catch((error) => {
      console.log(error)
    })

    await getSchedule().then(() => {
      setAlert(true)
    })
  }

  useEffect(() => {
    if (deleteDate) {
      setType('Delete')
      let full = [...schedules.full]
      let morningArr = [...schedules.morning]
      let afternoonArr = [...schedules.afternoon]
      if (full.indexOf(deleteDate) >= 0) {
        full.splice(full.indexOf(deleteDate), 1)
      } else if (morningArr.indexOf(deleteDate) >= 0) {
        morningArr.splice(morningArr.indexOf(deleteDate), 1)
      } else if (afternoonArr.indexOf(deleteDate) >= 0) {
        afternoonArr.splice(afternoonArr.indexOf(deleteDate), 1)
      }
      let arr = concatSchedule(full, morningArr, afternoonArr)

      putSchedlues(arr)
    }
  }, [deleteDate])

  useEffect(() => {
    if (editInformation?.time) {
      setType('Edit')
      let full = [...schedules.full]
      let morningArr = [...schedules.morning]
      let afternoonArr = [...schedules.afternoon]

      switch (editInformation.prevTime) {
        case 'Morning':
          morningArr.splice(morningArr.indexOf(editInformation.date), 1)
          break
        case 'Full':
          full.splice(full.indexOf(editInformation.date), 1)
          break
        default:
          afternoonArr.splice(afternoonArr.indexOf(editInformation.date), 1)
          break
      }

      switch (editInformation.time) {
        case 'Morning':
          morningArr.splice(morningArr.length, 0, editInformation.date)
          break
        case 'Full':
          full.splice(full.length, 0, editInformation.date)
          break
        default:
          afternoonArr.splice(afternoonArr.length, 0, editInformation.date)
          break
      }

      let arr = concatSchedule(full, morningArr, afternoonArr)

      setEditInformation('')
      putSchedlues(arr)
    }
  }, [editInformation])

  if (schedules === undefined) {
    return <LoadingPage />
  }

  return (
    <Box className="ds-body">
      <Box className="ds-body-alert">
        <ComAlert direction="left" />
      </Box>
      <Box className="ds-body-container">
        <Button className="ds-body-container-button mobileDisplay" onClick={() => setOpenDialog(true)}>
          Add new schedule
        </Button>
        <ResDialog open={openDialog} setOpen={setOpenDialog} />
        <Box className="ds-body-item-1 ">
          <DSLeft schedules={schedules} setSchedules={setSchedules} bookings={bookings} />
        </Box>
        <Box className="ds-body-item-2">
          <DSRight schedules={schedules} setDeleteDate={setDeleteDate} setEditInformation={setEditInformation} />
        </Box>
      </Box>
    </Box>
  )
}

export default Body
