import { Box } from '@mui/material'
import LPNav from '../../screens/LandingPage/LPNav'

function index({ children }) {
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
      {children}
    </Box>
  )
}

export default index
