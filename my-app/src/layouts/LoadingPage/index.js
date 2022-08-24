import { Box, CircularProgress } from '@mui/material'

function index() {
  return (
    <Box
      className="loadingPage"
      sx={{
        height: `${window.innerHeight - 85.6 - 48}px`,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default index
