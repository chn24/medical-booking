import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { DocIn4Context } from './InformationRight'
import ava1 from '../../../../assets/image/ava1.jpg'
import ava2 from '../../../../assets/image/ava2.jpg'
import ava3 from '../../../../assets/image/ava3.png'
import CommentCom from '../../../common/Comment'

const avaList = [ava1, ava2, ava3]
function CommentTab() {
  const context = useContext(DocIn4Context)
  const [comments, setComments] = useState([])

  const callApi = async () => {
    var res = await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${context.docId}`)
      .then((response) => {
        setComments(response.data.feedbacks)
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
        return <CommentCom key={index} feedback={comment} />
      })}
    </Stack>
  )
}

export default CommentTab
