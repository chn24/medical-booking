import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

import { alertState } from '../../../../recoil/alertState'
import { useResetRecoilState, useSetRecoilState } from 'recoil'

function DBRow(props) {
  const { index, show, deleteInfo, setDeleteInfo } = props
  const [open, setOpen] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)

  const setAlertText = useSetRecoilState(alertState)
  const setDefaultAlert = useResetRecoilState(alertState)

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
        console.log(1)
        setDefaultAlert()
        setDeleteAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [deleteAlert])

  const handleDelete = () => {
    setOpen(true)
  }

  const handleAgree = () => {
    setDeleteInfo({
      id: show.id,
      patientId: show.patientId,
    })
    setDeleteAlert(true)
    setOpen(false)
  }

  const handleDissagree = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{show.patientName}</TableCell>
        <TableCell align="left">{show.date}</TableCell>
        <TableCell align="left">{show.time}</TableCell>
        <TableCell align="left">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
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

export default DBRow
