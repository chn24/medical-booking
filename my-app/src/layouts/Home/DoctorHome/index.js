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
    detail: 'Doctor detail',
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
    detail: 'This is your medical examination schedule',
    to: 'booking-schedule',
    icon: <ScheduleIcon sx={{ color: '#fff' }} />,
    linear: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
  },
]

const Height = window.innerHeight - 86.6 - 64
function index() {
  return (
    <Box
      sx={{
        height: `${Height}px`,
        minHeight: `${Height}px`,
        boxSizing: 'border-box',
        padding: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          width: '85%',
          height: '75%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {services.map((service) => {
          return (
            <NavLink
              to={service.to}
              style={{
                textDecoration: 'none',
                width: '30%',
              }}
              key={service.id}
            >
              <Paper
                sx={{
                  width: '100%',
                  height: '75%',
                  margin: '15px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow:
                    'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
                  borderRadius: '15px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '0.5rem 1rem 0',
                    boxSizing: 'border-box',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '15px',
                      background: service.linear,
                      width: '4rem',
                      height: '4rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '-1.5rem',
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" color={'rgb(123, 128, 154)'}>
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
                <Box
                  sx={{
                    padding: '0 1rem 0.5rem',
                    boxSizing: 'border-box',
                  }}
                >
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
