import { Box } from '@mui/system'
import LPNav from '../LandingPage/LPNav'
import Body from './components/Body'

function index() {
  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight}px`,
        backgroundColor: 'rgb(240, 242, 245)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav tab={'News'} />
      <Body />
    </Box>
  )
}

export default index