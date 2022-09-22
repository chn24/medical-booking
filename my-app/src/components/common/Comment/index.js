import ava1 from '../../../assets/image/ava1.jpg'
import { Avatar, Box, Paper, Stack, TextField, Typography } from '@mui/material'

const CommentCom = ({ feedback }) => {
  return (
    <Box className="comment">
      <Box
        sx={{
          display: 'inline-block',
        }}
      >
        <Avatar alt="avatar1" src={ava1} />
      </Box>
      <Stack
        sx={{
          padding: '0 0 0 1.5rem',
          width: '75%',
        }}
      >
        <Box className="comment-information">
          <Typography className="comment-information-text" variant="subtitle1">
            {feedback?.name}
          </Typography>
          <Typography className="comment-information-text" variant="subtitle1">
            {feedback?.date}
          </Typography>
        </Box>
        <Box className="comment-information-contentBox">
          <Typography className="comment-information-contentBox-text" variant="subtitle1">
            {feedback.content}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default CommentCom
