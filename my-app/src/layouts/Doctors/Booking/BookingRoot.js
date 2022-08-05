import { Box, Grid } from '@mui/material'
import BookingLeft from './BookingLeft'
import BookingRight from './BookingRight'

function BookingRoot() {
  return (
    <Box
      sx={{
        padding: '64px 32px 32px',
        boxSizing: 'content-box',
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <BookingLeft />
        </Grid>
        <Grid item xs={4}>
          <BookingRight />
        </Grid>
      </Grid>
    </Box>
  )
}

export default BookingRoot
