import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import Body from './components/Body'

const Feedback = () => {
  const { doctorId } = useParams()
  return (
    <Box>
      <Body doctorId={doctorId} />
    </Box>
  )
}

export default Feedback
