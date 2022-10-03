import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import LPNav from '../LandingPage/LPNav'
import Main from './components/Main'

const star = Math.floor(Math.random() * 5) + 1
function DoctorInformation() {
  const { doctorid } = useParams()

  return (
    <Box>
      <Main doctorid={doctorid} star={star} />
    </Box>
  )
}

export default DoctorInformation
