import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ava from '../../../../assets/image/ava.jpg'
import ava1 from '../../../../assets/image/ava1.jpg'
import { Avatar, Box, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'

import CommentCom from '../../../common/Comment'
import LoadingPage from '../../../common/LoadingPage'

import SendIcon from '@mui/icons-material/Send'

import { useRecoilValue, useResetRecoilState } from 'recoil'
import { dataState } from '../../../../recoil/dataState'
import { loginState } from '../../../../recoil/loginState'
import { feedbackState } from '../../../../recoil/feedbackState'

const Body = ({ doctorId }) => {
  const userData = useRecoilValue(dataState)
  const loginData = useRecoilValue(loginState)
  const feedbackData = useRecoilValue(feedbackState)
  const resetFeedbackData = useResetRecoilState(feedbackState)

  const textRef = useRef(null)
  const [feedbacks, setFeedbacks] = useState()
  const [feedbackText, setFeedbackText] = useState()

  const getData = async () => {
    await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${doctorId}`)
      .then((response) => {
        setFeedbacks(response.data.feedbacks)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus()
    }
  }, [textRef.current])

  const sendFeedback = async () => {
    let arr = [...feedbacks]
    arr.push({
      patientId: loginData.id,
      name: userData.information.name,
      content: feedbackText,
      date: feedbackData.information.date,
      time: feedbackData.information.time,
      id: feedbackData.information.id,
    })
    let putData = {
      feedbacks: arr,
    }

    await axios
      .put(`https://62c65d1874e1381c0a5d833e.mockapi.io/doctorSchedule/${doctorId}`, putData)
      .catch((error) => {
        console.log(error)
      })

    let arr2
    await axios
      .get(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${loginData.id}`)
      .then((response) => {
        arr2 = [...response.data.dates]
        for (let key in arr2) {
          if (arr2[key].id === feedbackData.information.id) {
            arr2[key].isComment = true
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })

    const data2 = {
      dates: arr2,
    }

    await axios.put(`https://62c65d1874e1381c0a5d833e.mockapi.io/userData/${loginData.id}`, data2).catch((error) => {
      console.log(error)
    })

    await getData()

    await resetFeedbackData()

    await setFeedbackText('')
  }

  const handleSumit = () => {
    if (feedbackText) {
      sendFeedback()
    }
  }

  return feedbacks === undefined ? (
    <LoadingPage />
  ) : (
    <Box className="feedback">
      <Box className="feedback-dBg"></Box>
      <Box className="feedback-content">
        <Box className="feedback-content-head">
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
            >{`Doctor ${doctorId}`}</Typography>
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
        <Box className="feedback-content-comment">
          {feedbacks.map((feedback, index) => (
            <CommentCom key={index} feedback={feedback} />
          ))}
        </Box>
        <Divider
          sx={{
            margin: '1rem 0',
          }}
        />
        <Box className="feedback-content-newFeedBack">
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
            <Box className="feedback-content-newFeedBack-information">
              <Typography className="feedback-content-newFeedBack-information-text" variant="subtitle1">
                {userData.information.name}
              </Typography>
              {feedbackData.information.date && (
                <Typography className="feedback-content-newFeedBack-information-text" variant="subtitle1">
                  {feedbackData.information.date}
                </Typography>
              )}
            </Box>
            <Box className="feedback-content-newFeedBack-inputBox">
              <TextField
                inputRef={textRef}
                className="feedback-content-newFeedBack-input"
                label="Feedback"
                variant="filled"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
              <IconButton color="primary" disabled={!feedbackData.canFeedback} onClick={handleSumit}>
                <SendIcon />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Body
