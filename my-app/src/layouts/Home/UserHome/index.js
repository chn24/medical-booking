import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import GroupIcon from '@mui/icons-material/Group'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'

const serviceList = [
  {
    id: 1,
    name: 'News',
    detail: 'News',
    to: 'news',
    linear: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
    icon: <NewspaperIcon sx={{ color: '#fff', fontWeight: '500' }} />,
  },
  {
    id: 2,
    name: 'Doctor list',
    detail: 'Doctor list',
    to: 'doctor-list',
    linear: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
    icon: <GroupIcon sx={{ color: '#fff', fontWeight: '500' }} />,
  },
  {
    id: 3,
    name: 'Booking schedules',
    detail: 'Your booking schdules',
    to: 'your-booking',
    linear: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
    icon: <LocalPharmacyIcon sx={{ color: '#fff', fontWeight: '500' }} />,
  },
]
const Height = window.innerHeight - 86.6 - 64
function index() {
  return (
    <Box
      className="userhome"
      sx={{
        minHeight: `${Height}px`,
      }}
    >
      <Stack
        className="userhome-stack"
        sx={{
          width: '85%',
          height: '50%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {serviceList.map((service) => {
          return (
            <NavLink to={service.to} className="uh-link userhome-link" key={service.id}>
              <Paper className="userhome-link-paper">
                <Box className="userhome-link-paper-head">
                  <Box
                    className=" userhome-link-paper-head-icon"
                    sx={{
                      background: service.linear,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Box>
                    <Typography
                      className="userhome-link-paper-head-name"
                      variant="subtitle1"
                      color={'rgb(123, 128, 154)'}
                    >
                      {service.name}
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
                <Box className="userhome-link-paper-description">
                  <Typography variant="subtitle1" className="uh-tab-font16 ">
                    {service.detail}
                  </Typography>
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
