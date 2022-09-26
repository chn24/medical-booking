import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { Avatar, Box, Divider, Fade, Grid, Paper, Stack, Typography } from '@mui/material'

import ava from '../../../../assets/image/ava.jpg'
import ava1 from '../../../../assets/image/ava1.jpg'
import ava2 from '../../../../assets/image/ava2.jpg'
import ava3 from '../../../../assets/image/ava3.png'

import { dataState } from '../../../../recoil/dataState'

import Options from './Options'
import CommentCom from '../../../common/Comment'

const avaList = [ava1, ava2, ava3]

function CommentTab() {
  const loginData = useRecoilValue(dataState)
  const [comments, setComments] = useState([])

  const getComments = async () => {
    const res = await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${loginData.information.id}`)
      .then((response) => {
        setComments(response.data.feedbacks)
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
        {comments.map((comment, index) => {
          return <CommentCom key={index} feedback={comment} />
        })}
      </Stack>
    </Stack>
  )
}

export default CommentTab
