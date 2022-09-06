import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

function DBDialog(props) {
  const { open, setOpen } = props
  const handleAgree = () => {
    setOpen(false)
  }

  const handleDissagree = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
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
  )
}

export default DBDialog
