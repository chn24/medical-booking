import { Dialog, Fade } from '@mui/material'
import DSLeft from './DSLeft'

function ResDialog(props) {
  const { open, setOpen } = props
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DSLeft />
    </Dialog>
  )
}

export default ResDialog
