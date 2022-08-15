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
        <Box
          sx={{
            position: 'absolute',
            left: '1rem',
            bottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h4"
            className="news-mobile-font-16"
            sx={{
              color: '#fff',
            }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="subtitle1"
            className="news-mobile-font-12"
            sx={{
              color: '#fff',
            }}
          >
            {data.detail}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SlideNews
