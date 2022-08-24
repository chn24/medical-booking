import { Box, Divider, Paper, Typography } from '@mui/material'
import { display } from '@mui/system'

function Topic(props) {
  const { data } = props
  return (
    <Box className="topic">
      <Paper
        className="topic-paper"
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
          <Typography className="topic-information-title " variant="h5">
            {data.title}
          </Typography>
          <Typography className="topic-information-detail " variant="subtitle1">
            {data.detail}
          </Typography>
          <Divider
            variant="middle"
            sx={{
              margin: '0.5rem 0',
            }}
          ></Divider>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography className="topic-information-credit " variant="caption">
              {data.since}
            </Typography>
            <Typography className="topic-information-credit " variant="caption">
              {data.author}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Topic
