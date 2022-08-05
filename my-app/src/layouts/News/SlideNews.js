import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import './assets/scss/index.scss'
import './assets/scss/responsive.scss'

function SlideNews(props) {
  const { data } = props
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        className="slide-bg"
        // sx={{
        //   width: '95%',
        // }}
      >
        <Typography
          variant="h4"
          className="news-mobile-font-16"
          sx={{
            position: 'absolute',
            left: '1rem',
            bottom: '3rem',
            color: '#fff',
          }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="subtitle1"
          className="news-mobile-font-12"
          sx={{
            position: 'absolute',
            left: '1rem',
            bottom: '1rem',
            color: '#fff',
          }}
        >
          {data.detail}
        </Typography>
      </Box>
    </Box>
  )
}

export default SlideNews
