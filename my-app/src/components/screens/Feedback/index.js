import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import LPNav from '../LandingPage/LPNav'
import Body from './components/Body'

const Feedback = () => {
  const { doctorId } = useParams()
  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight + 1}px`,
        backgroundColor: 'rgb(240, 242, 245)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav />
      <Body doctorId={doctorId} />
    </Box>
  )
}

export default Feedback
