import { Box, Button, FormControl, Grid } from '@mui/material'
import LPNav from '../../LandingPage/LPNav'
import Body from './Body'

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
      <LPNav tabs={[{ name: 'Your schedule', to: '' }]} />
      <Body />
    </Box>
  )
}

export default index
