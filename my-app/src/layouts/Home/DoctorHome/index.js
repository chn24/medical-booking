import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ScheduleIcon from '@mui/icons-material/Schedule'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import GroupIcon from '@mui/icons-material/Group'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'

const services = [
  {
    id: 1,
    title: 'News',
    detail: 'News',
    to: 'news',
    linear: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
    icon: <NewspaperIcon sx={{ color: '#fff', fontWeight: '500' }} />,
  },
  {
    id: 2,
    title: 'Doctor list',
    detail: 'Doctor list',
    to: 'doctor-list',
    linear: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
    icon: <GroupIcon sx={{ color: '#fff', fontWeight: '500' }} />,
  },
  {
    id: 3,
    title: 'Pharmacies',
    detail: 'Finding the nearest pharmacy',
    to: '',
    linear: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
    icon: <LocalPharmacyIcon sx={{ color: '#fff', fontWeight: '500' }} />,
  },
  {
    id: 4,
    title: 'Your profile',
    detail: 'This is your profile',
    to: 'your-profile',
    icon: <PersonOutlineIcon sx={{ color: '#fff', fontWeight: '500' }} />,
    linear: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
  },
  {
    id: 5,
    title: 'Your schedule',
    detail: 'This is your Schedule',
    to: 'your-schedule',
    icon: <DateRangeIcon sx={{ color: '#fff', fontWeight: '500' }} />,
    linear: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
  },
  {
    id: 6,
    title: 'Booking Schedule',
    detail: 'Your medical schedule',
    to: 'booking-schedule',
    icon: <ScheduleIcon sx={{ color: '#fff' }} />,
    linear: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
  },
]

const Height = window.innerHeight - 86.6 - 64
function index() {
  return (
    <Box
      className="doctorhome"
      sx={{
        minHeight: `${Height}px`,
      }}
    >
      <Stack className="doctorhome-stack">
        {services.map((service) => {
          return (
            <NavLink className="doctorhome-link" to={service.to} key={service.id}>
              <Paper className="doctorhome-link-paper">
                <Box className="doctorhome-link-paper-head">
                  <Box
                    className="doctorhome-link-paper-head-icon"
                    sx={{
                      background: service.linear,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Box>
                    <Typography
                      className="doctorhome-link-paper-title"
                      variant="subtitle1"
                      color={'rgb(123, 128, 154)'}
                    >
                      {service.title}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    margin: '1rem 0',
                  }}
                >
                  <Divider variant="middle" />
                </Box>
                <Box className="doctorhome-link-paper-description">
                  <Typography variant="subtitle1">{service.detail}</Typography>
                </Box>
              </Paper>
            </NavLink>
          )
        })}
      </Stack>
    </Box>
  )
}

export default index
