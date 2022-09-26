import { Box, Paper, Typography } from '@mui/material'

const HOCBox = ({ data, children }) => {
  return (
    <Paper className="HOCBox">
      <Box
        sx={{
          width: `${data?.aHalf ? '50%' : '100%'}`,
        }}
        className="HOCBox-head"
      >
        <Typography variant="h6">{data.title}</Typography>
      </Box>
      <Box className="HOCBox-body">{children}</Box>
    </Paper>
  )
}

export default HOCBox
