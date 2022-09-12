import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useState } from 'react'

function DeleteDialog(props) {
  const { open, setOpen, timeDelete, setTimeDelete } = props

  const handleSetFull = () => {
    setTimeDelete('Full')
    setOpen(false)
  }

  const handleSetMorning = () => {
    setTimeDelete('Morning')
    setOpen(false)
  }

  const handleSetAfternoon = () => {
    setTimeDelete('Afternoon')
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete schedule'}</DialogTitle>
      <DialogContent id="alert-dialog-description">{'Choose your options'}</DialogContent>
      <DialogActions>
        <Stack>
          <Box>
            <Button onClick={handleSetFull}>Full</Button>
            <Button onClick={handleSetMorning}>Morning</Button>
            <Button onClick={handleSetAfternoon}>Afternoon</Button>
          </Box>
          <Button onClick={handleClose}>Close</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
