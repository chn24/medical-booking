import { Box } from '@mui/material'
import LPNav from '../../LandingPage/LPNav'
import DoctorList from './DoctorList'

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
      <LPNav tabs={[{ name: 'Doctor list', to: '' }]} />
      <DoctorList />
    </Box>
  )
}

export default index
