import { Box, Link, Paper, Stack, Typography } from '@mui/material'
import logo from '../pic/logo.png'
import PlaceIcon from '@mui/icons-material/Place'

function BookingRight() {
  return (
    <Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
        }}
      >
        <Box
          sx={{
            margin: '-35px 16px 0 16px',
            padding: '24px 16px',
            opacity: '1',
            background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
            color: '#fff',
            borderRadius: '0.5rem',
            boxShadow:
              'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
          }}
        >
          <Typography variant="h5">BookingRight</Typography>
        </Box>
        <Box
          sx={{
            padding: '16px',
          }}
        >
          <Stack className="bR-stack">
            <Box
              className="bookingR-img"
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={logo}
                alt=""
                style={{
                  width: '65%',
                }}
              />
            </Box>
            <Box>
              <PlaceIcon />
              <Link
                href="https://bit.ly/3OvIhwD"
                sx={{
                  textDecoration: 'none',
                }}
              >
                Phạm Hùng, Nam Từ Liêm, Hà Nội
              </Link>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}

export default BookingRight
