import { Box, Typography } from '@mui/material'

function SlideNews(props) {
  const { data } = props
  return (
    <Box
      className="slideNews"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        className="slideNews-bg"
        // sx={{
        //   width: '95%',
        // }}
      >
        <Box className="slideNews-inforation">
          <Typography variant="h4" className="slideNews-inforation-title">
            {data.title}
          </Typography>
          <Typography variant="subtitle1" className="slideNews-inforation-detail">
            {data.detail}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SlideNews
