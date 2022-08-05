import { Avatar, Box, Divider, Fade, Grid, Paper, Stack, Typography } from '@mui/material'
import { profileTab } from '../../../recoil/profileTab'
import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'

import ava from './assets/img/ava.jpg'
import ava1 from './assets/img/ava1.jpg'
import ava2 from './assets/img/ava2.jpg'
import ava3 from './assets/img/ava3.png'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CommentsContext } from './ProfileLeft'

const avaList = [ava1, ava2, ava3]

function CommentTab() {
  const context = useContext(CommentsContext)
  const loginData = useRecoilValue(dataState)
  const profileTabData = useRecoilValue(profileTab)

  const getComments = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${loginData.information.id}/comments`)
    if (res.data) {
      if (context.comments !== res.data) {
        context.setComments(res.data)
      }
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <Fade
      in={profileTabData === 'comment'}
      mountOnEnter
      unmountOnExit
      {...(profileTabData === 'comment' ? { timeout: 1000 } : {})}
    >
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
        <Divider
          sx={{
            margin: '1rem 0',
          }}
        />
        <Stack>
          {context.comments.map((comment) => {
            return (
              <Grid
                key={comment.id}
                container
                sx={{
                  margin: '1rem 0',
                }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    padding: '0 16px',
                    boxSizing: 'border-box',
                  }}
                >
                  <Avatar alt={`user-${comment.id}`} src={avaList[Math.floor(Math.random() * 3)]} />
                </Grid>
                <Grid item xs={9}>
                  <Paper
                    sx={{
                      padding: '15px',
                      background: 'linear-gradient(195deg, rgb(235, 239, 244), rgb(206, 212, 218))',
                      borderRadius: '15px',
                    }}
                  >
                    <Typography variant="overline">{`user ${comment.id + 1}`}</Typography>
                    <Typography variant="body1">{`${comment.body}`}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            )
          })}
        </Stack>
      </Stack>
    </Fade>
  )
}

export default CommentTab
