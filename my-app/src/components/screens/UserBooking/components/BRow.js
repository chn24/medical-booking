import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { TableRow, IconButton, TableCell } from '@mui/material'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

import { alertState } from '../../../../recoil/alertState'
import { useResetRecoilState, useSetRecoilState } from 'recoil'

function BRow(props) {
  const { index, date, setDeleteDateId } = props

  const [isAlert, setIsAlert] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const setAlertText = useSetRecoilState(alertState)
  const resetAlertText = useResetRecoilState(alertState)

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
    setIsAlert(true)
  }

  useEffect(() => {
    if (isAlert) {
      setAlertText({
        closeBtn: false,
        open: true,
        type: 'warning',
        information: {
          text: 'In Delete progress',
        },
      })
      let timeOut = setTimeout(() => {
        resetAlertText()
        setIsAlert(false)
      }, 1200)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [isAlert])
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
