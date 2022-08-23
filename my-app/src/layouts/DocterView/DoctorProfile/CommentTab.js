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
    <Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
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
            <Box
              key={comment.id}
              sx={{
                display: 'flex',
                marginTop: '16px',
              }}
            >
              <Box
                className="comment-ava-box"
                sx={{
                  width: 'max-content',
                  display: 'flex',
                  justifyContent: 'end',
                  padding: '0 16px',
                  boxSizing: 'border-box',
                }}
              >
                <Avatar
                  className="comment-ava"
                  alt={`user-${comment.id}`}
                  src={avaList[Math.floor(Math.random() * 3)]}
                />
              </Box>
              <Box
                sx={{
                  width: '75%',
                }}
              >
                <Paper
                  sx={{
                    padding: '15px',
                    background: 'linear-gradient(195deg, rgb(235, 239, 244), rgb(206, 212, 218))',
                    borderRadius: '15px',
                  }}
                >
                  <Typography variant="overline">{`user ${comment.id}`}</Typography>
                  <Typography className="comment-detail" variant="body1">{`${comment.body}`}</Typography>
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
