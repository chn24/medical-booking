import { Avatar, Box, Divider, Paper, Rating, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ava1 from '../pic/ava1.jpg'
import ava2 from '../pic/ava2.jpg'
import ava3 from '../pic/ava3.png'
import InformationRight from './InformationRight'
import LoadingPage from '../../LoadingPage'
import { dataState } from '../../../recoil/dataState'

import '../assets/scss/responsiveDoctorin4.scss'
import '../assets/scss/doctorin4.scss'
import { useRecoilValue } from 'recoil'

const rand = Math.floor(Math.random() * 3)
const avaList = [ava1, ava2, ava3]
function Main(props) {
  const { doctorid, star } = props
  const [doctor, setDoctor] = useState([])
  const loginData = useRecoilValue(dataState)

  const callApi = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${doctorid}`)
    if (res.data) {
      setDoctor(res.data)
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  return doctor === [] || loginData.roll === '' ? (
    <LoadingPage />
  ) : (
    <Box>
      <Box className="main-container">
        <Box
          className="docIn4-left"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1% 0',
          }}
        >
          <Paper
            sx={{
              width: '90%',
              padding: '15px',
              boxSizing: 'border-box',
              borderRadius: '15px',
            }}
          >
            <Box
              className="tab-docin4-disnone"
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={avaList[rand]}
                alt=""
                style={{
                  maxWidth: `65%`,
                  borderRadius: '50%',
                }}
              />
            </Box>
            <Box>
              <div className="in4-header">
                <Avatar className="docin4-avatar" alt="avatar" src={avaList[rand]} />
                <Typography className="docin4-docName" variant="h3">{`Dr.${doctor.name}`}</Typography>
              </div>
              <Divider></Divider>
              <Box
                sx={{
                  margin: '10px 0',
                }}
              >
                <Typography className="docin4-title" variant="h4">{`Hospital :`}</Typography>
                <Typography
                  className="docin4-detail docin4-mobile"
                  variant="h5"
                >{`${doctor?.company?.name}`}</Typography>
              </Box>
              <Box
                sx={{
                  margin: '10px 0',
                }}
              >
                <Typography className="docin4-title" variant="h4">{`Contact :`}</Typography>
                <Typography
                  className="docin4-detail docin4-mobile"
                  variant="subtitle1"
                >{`Phone number : ${doctor.phone}`}</Typography>
                <Typography
                  className="docin4-detail docin4-mobile"
                  variant="subtitle1"
                >{`Email : ${doctor.email}`}</Typography>
              </Box>
              <Typography component="legend">Rating</Typography>
              <Rating value={star} readOnly />
            </Box>
          </Paper>
        </Box>
        <Box
          className="docIn4-right"
          sx={{
            margin: '1% 0',
            height: '98%',
          }}
        >
          <InformationRight docId={doctor.id} />
        </Box>
      </Box>
    </Box>
  )
}

export default Main
