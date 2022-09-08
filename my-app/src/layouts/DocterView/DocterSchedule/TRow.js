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
