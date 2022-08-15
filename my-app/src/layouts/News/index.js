import { Box } from '@mui/system'
import LPNav from '../LandingPage/LPNav'
import Body from './Body'

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
      <LPNav tabs={[{ name: 'News', to: '' }]} />
      <Body />
    </Box>
  )
}

export default index
