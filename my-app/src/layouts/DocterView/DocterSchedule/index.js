import { Box, FormControl, Grid } from '@mui/material'
import LPNav from '../../LandingPage/LPNav'
import DSLeft from './DSLeft'
import DSRight from './DSRight'

function index() {
  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight - 1}px`,
        backgroundColor: 'rgb(240, 242, 245)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav />
      <Box
        sx={{
          height: `max-content`,
          padding: '48px 64px 0',
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <DSLeft />
          </Grid>
          <Grid item xs={8}>
            <DSRight />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default index
