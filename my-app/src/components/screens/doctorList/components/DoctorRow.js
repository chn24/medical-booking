import { Box, Collapse, IconButton, Rating, TableCell, TableRow } from '@mui/material'
import ArrowDown from '@mui/icons-material/KeyboardArrowDown'
import ArrowUp from '@mui/icons-material/KeyboardArrowUp'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'

const star = Math.floor(Math.random() * 5) + 1
function DoctorRow(props) {
  const { datas, id, roll } = props

  const [button1Load, setButton1Load] = useState(false)
  const [button2Load, setButton2Load] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleMoreIn4 = async () => {
    await setButton1Load(true)
    await navigate(`/doctor-list/doctor-information/${datas.id}`)
  }

  const handleBooking = async () => {
    await setButton2Load(true)
    await navigate('/doctor-list/booking')
  }

  return (
    <>
      <TableRow key={datas.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left" key={`id-${datas.id}`}>
          {datas.id}
        </TableCell>
        <TableCell align="left" key={`name-${datas.id}`}>
          {datas.name}
        </TableCell>
        <TableCell className="mobile-hide" align="left" key={`email-${datas.id}`}>
          {datas.email}
        </TableCell>
        <TableCell align="left" key={`rating-${datas.id}`}>
          <Rating value={star} readOnly />
        </TableCell>
        <TableCell align="left" key={`button-${datas.id}`}>
          <IconButton onClick={() => setOpen(!open)}>{open ? <ArrowUp /> : <ArrowDown />}</IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: `${open ? '16px' : '0'}`,
            paddingTop: `${open ? '16px' : '0'}`,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <LoadingButton loading={button1Load} variant="contained" onClick={handleMoreIn4}>
                More information
              </LoadingButton>
              <LoadingButton
                disabled={id === datas.id && roll === 'Doctor'}
                loading={button2Load}
                variant="contained"
                onClick={handleBooking}
              >
                Booking
              </LoadingButton>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default DoctorRow
