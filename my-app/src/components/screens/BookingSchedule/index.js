import { Box } from '@mui/material'
import LPNav from '../LandingPage/LPNav'
import Body from './components/Body'

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
      <LPNav tab={'Home'} />
      <Body />
    </Box>
  )
}

export default index
