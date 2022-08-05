import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { DocIn4Context } from './InformationRight'
import ava1 from '../pic/ava1.jpg'
import ava2 from '../pic/ava2.jpg'
import ava3 from '../pic/ava3.png'

const rand = Math.floor(Math.random() * 2)
const avaList = [ava1, ava2, ava3]
function CommentTab() {
  const context = useContext(DocIn4Context)

  const callApi = async () => {
    var res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.docId}/comments`)
    if (res.data) {
      context.setComments(res.data)
    }
    console.log(res.data)
  }

  useEffect(() => {
    if (context.comments.length === 0) {
      callApi()
    }
    console.log(context.docId)
  }, [])

  return (
    <Stack>
      {context.comments.map((comment, index) => {
        return (
          <Grid
            container
            key={index}
            sx={{
              margin: '5px 0',
            }}
          >
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Avatar alt={`user-${index}`} src={avaList[Math.floor(Math.random() * 3)]} />
            </Grid>
            <Grid item xs={9}>
              <Paper
                sx={{
                  padding: '15px',
                  background: 'linear-gradient(195deg, rgb(235, 239, 244), rgb(206, 212, 218))',
                  borderRadius: '15px',
                }}
              >
                <Typography variant="overline">{`user ${index + 1}`}</Typography>
                <Typography variant="body1">{`${comment.body}`}</Typography>
              </Paper>
            </Grid>
          </Grid>
        )
      })}
    </Stack>
  )
}

export default CommentTab
