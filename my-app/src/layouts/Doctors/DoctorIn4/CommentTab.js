import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { DocIn4Context } from './InformationRight'
import ava1 from '../pic/ava1.jpg'
import ava2 from '../pic/ava2.jpg'
import ava3 from '../pic/ava3.png'

const avaList = [ava1, ava2, ava3]
function CommentTab() {
  const context = useContext(DocIn4Context)
  const [comments, setComments] = useState([])

  const callApi = async () => {
    var res = await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${context.docId}/comments`)
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    callApi()
  }, [])

  return (
    <Stack className="commentsTab">
      {comments.map((comment, index) => {
        return (
          <Grid className="commentsTab-commentContainer" container key={index}>
            <Grid item className="commentsTab-commentItem-1" xs={2}>
              <Avatar alt={`user-${index}`} src={avaList[Math.floor(Math.random() * 3)]} />
            </Grid>
            <Grid className="commentsTab-commentItem-2" item xs={9}>
              <Paper className="commentsTab-commentItem-2-paper">
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
