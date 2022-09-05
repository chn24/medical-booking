import { TableRow, IconButton, TableCell } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function BRow(props) {
  const { index, date, setDeleteDateId } = props

  const handleDelete = () => {
    setDeleteDateId(date.id)
  }

  return (
    <TableRow>
      <TableCell align="left">{index}</TableCell>
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
  )
}

export default BRow
