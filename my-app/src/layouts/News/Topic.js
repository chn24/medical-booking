import { Box, Divider, Paper, Typography } from '@mui/material'
import { display } from '@mui/system'
import './assets/scss/index.scss'
import './assets/scss/responsive.scss'

function Topic(props) {
  const { data } = props
  return (
    <Box className="topic-item">
      <Paper
        className="news-topic-paper"
        sx={{
          width: '100%',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box className="topic-bg"></Box>
        <Box className="topic-information">
          <Typography className="title-color  news-mobile-font-16" variant="h5">
            {data.title}
          </Typography>
          <Typography className="non-title-color  news-mobile-font-10" variant="subtitle1">
            {data.detail}
          </Typography>
          <Divider
            variant="middle"
            sx={{
              margin: '0.5rem 0',
            }}
          ></Divider>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography className="non-title-color news-mobile-font-9" variant="caption">
              {data.since}
            </Typography>
            <Typography className="non-title-color news-mobile-font-9" variant="caption">
              {data.author}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Topic
