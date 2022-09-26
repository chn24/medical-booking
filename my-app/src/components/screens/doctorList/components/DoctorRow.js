import { startTransition, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Box, Button, Rating, Typography } from '@mui/material'

import { useRecoilState } from 'recoil'
import { bookingState } from '../../../../recoil/bookingState'

const star = Math.floor(Math.random() * 5) + 1
function DoctorRow(props) {
  const { datas, id, roll } = props

  const [bookingIn4, setBookingIn4] = useRecoilState(bookingState)

  const [button1Load, setButton1Load] = useState(false)
  const [button2Load, setButton2Load] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleMoreIn4 = async () => {
    await setButton1Load(true)
    await navigate(`/doctor-list/doctor-information/${datas.id}`)
  }

  const handleBooking = async () => {
    await setBookingIn4({
      ...bookingIn4,
      booking: {
        ...bookingIn4.booking,
        doctorName: {
          value: datas,
          isChoosen: true,
          error: false,
        },
      },
    })
    await setButton2Load(true)
    await navigate('/doctor-list/booking')
    ///
  }

  return (
    <>
      <Box className="doctorIn4">
        <Box className="doctorIn4-ava" id={`doctorIn4-ava${datas.id}`}></Box>
        <Box className="doctorIn4-content">
          <Link to={`doctor-list/doctor-information/${datas.id}`} className="doctorIn4-content-link">
            <Typography variant="subtitle1">Name:{datas.name}</Typography>
          </Link>
          <Typography className="doctorIn4-content-email" variant="subtitle1">
            Email:{datas.email}
          </Typography>
          <Rating value={star} readOnly />
          <Button className="doctorIn4-content-btn" onClick={handleBooking}>
            Booking
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default DoctorRow
