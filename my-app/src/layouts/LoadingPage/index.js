import { Box, CircularProgress } from '@mui/material'

function index() {
  return (
    <Box
      sx={{
        height: `${window.innerHeight - 85.6 - 48}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default index
