import { TableRow, IconButton, TableCell } from '@mui/material'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

function BRow(props) {
  const { index, date, setDeleteDateId } = props

  const [deleteDialog, setDeleteDialog] = useState(false)

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
    setDeleteDateId(date.id)
    setDeleteDialog(false)
  }

  // const handleDelete = () => {
  //   setDeleteDateId(date.id)
  // }

  return (
    <>
      <TableRow>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{date?.docterName}</TableCell>
        <TableCell align="left">{date?.patientName}</TableCell>
        <TableCell align="left">{date?.date}</TableCell>
        <TableCell align="left">{date?.time}</TableCell>
        <TableCell align="left">
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
    </>
  )
}

export default BRow
