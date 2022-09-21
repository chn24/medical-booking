import { Avatar, Box, Stack, TextField, Typography } from '@mui/material'
import ava1 from '../../../../assets/image/ava1.jpg'

const CommentCom = ({ feedback }) => {
  console.log(feedback)
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
        <Box>
          <TextField
            variant="filled"
            className="comment-information-content"
            defaultValue={feedback.content}
            disabled={true}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default CommentCom
