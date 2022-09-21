import moment from 'moment'
import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { DialogContent, IconButton, TableCell, TableRow } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/ModeEdit'

import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { alertState } from '../../../../recoil/alertState'

function TRow(props) {
  const { schedule, id, setDeleteDate, setEditInformation } = props
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [editAlert, setEditAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)

  const setAlertText = useSetRecoilState(alertState)
  const setDefaultAlert = useResetRecoilState(alertState)
  // const [timeDelete, setTimeDelete] = useState('')
  /*
setAlertText({
        closeBtn: false,
        open: true,
        type: 'warning',
        information: {
          text: 'In progress',
        },
      })
      let timeOut = setTimeout(() => setDefaultAlert(), 1500)
*/
  ///-----------------------------------------------Delete

  useEffect(() => {
    if (deleteAlert) {
      setAlertText({
        closeBtn: false,
        open: true,
        type: 'warning',
        information: {
          text: 'In delete progress',
        },
      })
      let timeOut = setTimeout(() => {
        setDefaultAlert()
        setDeleteAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [deleteAlert])

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
    setDeleteAlert(true)
  }

  ///-----------------------------------------------Edit

  useEffect(() => {
    if (editAlert) {
      setAlertText({
        closeBtn: false,
        open: true,
        type: 'warning',
        information: {
          text: 'In Edit progress',
        },
      })
      let timeOut = setTimeout(() => {
        setDefaultAlert()
        setEditAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [editAlert])

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
    setEditAlert(true)
  }

  const handleEditAfternoon = () => {
    setEditInformation({
      date: moment(schedule.date).format('YYYY-MM-DD'),
      prevTime: schedule.time,
      time: 'Afternoon',
    })
    setEditDialog(false)
    setEditAlert(true)
  }

  const handleEditFull = () => {
    setEditInformation({
      date: moment(schedule.date).format('YYYY-MM-DD'),
      prevTime: schedule.time,
      time: 'Full',
    })
    setEditDialog(false)
    setEditAlert(true)
  }

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

      <Dialog
        sx={{
          position: 'fixed',
        }}
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
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
