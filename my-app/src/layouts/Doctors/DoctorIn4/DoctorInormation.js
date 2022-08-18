import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import LPNav from '../../LandingPage/LPNav'
import Main from './Main'

const star = Math.floor(Math.random() * 5) + 1
function DoctorInformation() {
  const { doctorid } = useParams()

  const Height = window.innerHeight
  return (
    <Box
      sx={{
        minHeight: `${Height}px`,
        backgroundColor: 'rgb(240, 242, 245)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav
        tabs={[
          { name: 'Doctor list', to: 'doctor-list' },
          { name: 'Doctor information', to: '' },
        ]}
      />
      <Main doctorid={doctorid} star={star} />
    </Box>
  )
}

export default DoctorInformation
