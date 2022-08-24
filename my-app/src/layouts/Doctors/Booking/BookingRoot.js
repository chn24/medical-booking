import { Box, Grid } from '@mui/material'
import BookingLeft from './BookingLeft'
import BookingRight from './BookingRight'

function BookingRoot() {
  return (
    <Box
      className="booking-box"
      sx={{
        padding: '64px 32px 32px',
        boxSizing: 'content-box',
      }}
    >
      <Box
        className="booking-container"
        sx={{
          display: 'flex',
        }}
      >
        <Box
          className="booking-item booking-box-1"
          sx={{
            width: '67%',
          }}
        >
          <BookingLeft />
        </Box>
        <Box
          className="booking-item"
          sx={{
            width: '33%',
          }}
        >
          <BookingRight />
        </Box>
      </Box>
    </Box>
  )
}

export default BookingRoot
