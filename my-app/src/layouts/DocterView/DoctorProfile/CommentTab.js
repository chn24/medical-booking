import { Avatar, Box, Divider, Fade, Grid, Paper, Stack, Typography } from '@mui/material'
import { profileTab } from '../../../recoil/profileTab'
import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'

import ava from './assets/img/ava.jpg'
import ava1 from './assets/img/ava1.jpg'
import ava2 from './assets/img/ava2.jpg'
import ava3 from './assets/img/ava3.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Options from './Options'

const avaList = [ava1, ava2, ava3]

function CommentTab() {
  const loginData = useRecoilValue(dataState)
  const [comments, setComments] = useState([])

  const getComments = async () => {
    const res = await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${loginData.information.id}/comments`)
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <Stack className="commentTab">
      <Box className="commentTab-head">
        <Avatar
          alt="avatar"
          src={ava}
          sx={{
            width: '5rem',
            height: 'auto',
          }}
        />
        <Stack
          sx={{
            padding: '0 0 0 1.5rem',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'rgb(52, 71, 103)',
            }}
          >
            {loginData.information.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgb(123, 128, 154)',
            }}
          >
            Doctor
          </Typography>
        </Stack>
      </Box>
      <Options />
      <Divider
        sx={{
          margin: '1rem 0',
        }}
      />
      <Stack>
        {comments.map((comment) => {
          return (
            <Box className="commentTab-comment" key={comment.id}>
              <Box className="commentTab-comment-avaBox">
                <Avatar
                  className="commentTab-comment-avaBox-ava"
                  alt={`user-${comment.id}`}
                  src={avaList[Math.floor(Math.random() * 3)]}
                />
              </Box>
              <Box
                sx={{
                  width: '75%',
                }}
              >
                <Paper className="commentTab-comment-paper">
                  <Typography variant="overline">{`user ${comment.id}`}</Typography>
                  <Typography
                    className="commentTab-comment-paper-detail"
                    variant="body1"
                  >{`${comment.body}`}</Typography>
                </Paper>
              </Box>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default CommentTab
// <Fade
//   in={profileTabData === 'comment'}
//   mountOnEnter
//   unmountOnExit
//   {...(profileTabData === 'comment' ? { timeout: 1000 } : {})}
// >
{
  /* </Fade> */
}
