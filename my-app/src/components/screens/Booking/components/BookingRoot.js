import { Box, Grid } from '@mui/material'
import BookingLeft from './BookingLeft'
import BookingRight from './BookingRight'

function BookingRoot() {
  return (
    <Box className="booking">
      <Box
        className="booking-container"
        sx={{
          display: 'flex',
        }}
      >
        <Box className="booking-item booking-box-1 booking-item1">
          <BookingLeft />
        </Box>
        <Box className="booking-item booking-item2">
          <BookingRight />
        </Box>
      </Box>
    </Box>
  )
}

export default BookingRoot
