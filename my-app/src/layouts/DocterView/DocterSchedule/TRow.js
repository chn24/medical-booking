import { IconButton, TableCell, TableRow } from '@mui/material'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteDialog from './DeleteDialog'
import { useEffect, useState } from 'react'
import { set } from 'date-fns'
import { dataState } from '../../../recoil/dataState'
import { useRecoilState } from 'recoil'
import { concatSchedule } from '../../../function/concatSchedule'
import axios from 'axios'

function TRow(props) {
  const [loginData, setLoginData] = useRecoilState(dataState)
  const { schedule, id } = props
  const [openDialog, setOpenDialog] = useState(false)
  const [timeDelete, setTimeDelete] = useState('')

  const getTimeDelete = () => {}

  const handleDelete = () => {
    if (schedule.time === 'Full') {
      setOpenDialog(true)
    } else {
      setTimeDelete(schedule.time)
    }
  }

  const putSchedlue = async (arr) => {
    let data = {
      dates: arr,
    }

    const put = await axios.put(
      `https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`,
      data,
    )
    const res = await axios.get(
      `https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`,
    )
    if (res.data) {
      let array = res.data.dates
      let fullArr = []
      let morningArr = []
      let afternoonArr = []
      for (let key in array) {
        switch (array[key].time) {
          case 'Full':
            fullArr.splice(fullArr.length, 0, array[key].date)
            break
          case 'Morning':
            morningArr.splice(morningArr.length, 0, array[key].date)
            break
          default:
            afternoonArr.splice(afternoonArr.length, 0, array[key].date)
            break
        }
      }

      setLoginData({
        ...loginData,
        schedule: {
          value: array,
          full: fullArr,
          morning: morningArr,
          afternoon: afternoonArr,
        },
      })
    }
  }

  useEffect(() => {
    if (timeDelete !== '') {
      const stringifiedDate = moment(schedule.date).format('YYYY-MM-DD')
      let fullArr = [...loginData.schedule.full]
      let morningArr = [...loginData.schedule.morning]
      let afternoonArr = [...loginData.schedule.afternoon]
      let valueArr = []

      switch (timeDelete) {
        case 'Full':
          fullArr.splice(fullArr.indexOf(stringifiedDate), 1)
          break
        case 'Morning':
          if (fullArr.indexOf(stringifiedDate) >= 0) {
            fullArr.splice(fullArr.indexOf(stringifiedDate), 1)
            afternoonArr.splice(afternoonArr.length, 0, stringifiedDate)
          } else {
            morningArr.splice(morningArr.indexOf(stringifiedDate), 1)
          }
          break
        default:
          if (fullArr.indexOf(stringifiedDate) >= 0) {
            fullArr.splice(fullArr.indexOf(stringifiedDate), 1)
            morningArr.splice(morningArr.length, 0, stringifiedDate)
          } else {
            afternoonArr.splice(afternoonArr.indexOf(stringifiedDate), 1)
          }
      }

      valueArr = concatSchedule(fullArr, morningArr, afternoonArr)
      setTimeDelete('')
      putSchedlue(valueArr)
    }
  }, [timeDelete])

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left">{id + 1}</TableCell>
        <TableCell align="left">{moment(schedule.date).format('dddd DD MMMM YYYY')}</TableCell>
        <TableCell align="left">{schedule.time}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <DeleteDialog open={openDialog} setOpen={setOpenDialog} timeDelete={timeDelete} setTimeDelete={setTimeDelete} />
    </>
  )
}

export default TRow
