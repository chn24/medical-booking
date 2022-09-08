import { DialogContent, IconButton, TableCell, TableRow } from '@mui/material'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/ModeEdit'
import { useState } from 'react'

function TRow(props) {
  const { schedule, id, setDeleteDate, setEditInformation } = props
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  // const [timeDelete, setTimeDelete] = useState('')

  ///-----------------------------------------------Delete
  const handleDelete = () => {
    setDeleteDialog(true)
  }

  const handleDeleteClose = () => {
    setDeleteDialog(false)
  }

  const handleDissagree = () => {
    setDeleteDialog(false)
  }

  const handleAgree = () => {
    setDeleteDate(moment(schedule.date).format('YYYY-MM-DD'))
    setDeleteDialog(false)
  }

  ///-----------------------------------------------Edit

  const handleEdit = () => {
    setEditDialog(true)
  }

  const handleEditClose = () => {
    setEditDialog(false)
  }

  const handleEditMorning = () => {
    setEditInformation({
      date: moment(schedule.date).format('YYYY-MM-DD'),
      prevTime: schedule.time,
      time: 'Morning',
    })
    setEditDialog(false)
  }

  const handleEditAfternoon = () => {
    setEditInformation({
      date: moment(schedule.date).format('YYYY-MM-DD'),
      prevTime: schedule.time,
      time: 'Afternoon',
    })
    setEditDialog(false)
  }

  const handleEditFull = () => {
    setEditInformation({
      date: moment(schedule.date).format('YYYY-MM-DD'),
      prevTime: schedule.time,
      time: 'Full',
    })
    setEditDialog(false)
  }

  /*
  
  
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
  }, [timeDelete])*/

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left">{id + 1}</TableCell>
        <TableCell align="left">{moment(schedule.date).format('dddd YYYY-MM-DD')}</TableCell>
        <TableCell align="left">{schedule.time}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={deleteDialog} onClose={handleDeleteClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle>
          <span>Are you sure ?</span>
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleDissagree}>
            Disagree
          </Button>
          <Button autoFocus onClick={handleAgree}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialog} onClose={handleEditClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle>
          <span>Edit schedule</span>
        </DialogTitle>
        <DialogContent>
          <span>Choose 1</span>
        </DialogContent>
        <DialogActions>
          <Button disabled={schedule.time === 'Morning'} autoFocus onClick={handleEditMorning}>
            Morning
          </Button>
          <Button disabled={schedule.time === 'Afternoon'} autoFocus onClick={handleEditAfternoon}>
            Afternoon
          </Button>
          <Button disabled={schedule.time === 'Full'} autoFocus onClick={handleEditFull}>
            Full
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TRow
