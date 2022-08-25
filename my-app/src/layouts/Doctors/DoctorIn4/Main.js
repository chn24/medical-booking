import { Avatar, Box, Divider, Paper, Rating, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ava1 from '../pic/ava1.jpg'
import ava2 from '../pic/ava2.jpg'
import ava3 from '../pic/ava3.png'
import InformationRight from './InformationRight'
import LoadingPage from '../../LoadingPage'
import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'

const rand = Math.floor(Math.random() * 3)
const avaList = [ava1, ava2, ava3]
function Main(props) {
  const { doctorid, star } = props
  const [doctor, setDoctor] = useState([])
  const loginData = useRecoilValue(dataState)

  const callApi = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${doctorid}`)
      .then((response) => {
        setDoctor(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (doctorid !== undefined) {
      callApi()
    }
  }, [doctorid])

  return doctorid === undefined || loginData.roll === '' || doctor.length === 0 ? (
    <LoadingPage />
  ) : (
    <Box>
      <Box className="main-container">
        <Box className="dIL">
          <Paper
            className="dIL-paper"
            sx={{
              width: '90%',
              padding: '15px',
              boxSizing: 'border-box',
              borderRadius: '15px',
            }}
          >
            <Box
              className="dIL-paper-bigAvaBox"
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
            <Box className="dIL-paper-content">
              <div className="dIL-paper-content-1">
                <Avatar className="dIL-paper-content-1-ava" alt="avatar" src={avaList[rand]} />
                <Typography className="dIL-paper-content-1-docName" variant="h3">{`Dr.${doctor.name}`}</Typography>
              </div>
              <Divider></Divider>
              <Box
                sx={{
                  margin: '10px 0',
                }}
              >
                <Typography className="dIL-paper-content-title" variant="h4">{`Hospital :`}</Typography>
                <Typography className="dIL-paper-content-detail" variant="h5">{`${doctor?.company?.name}`}</Typography>
              </Box>
              <Box
                sx={{
                  margin: '10px 0',
                }}
              >
                <Typography className="dIL-paper-content-title" variant="h4">{`Contact :`}</Typography>
                <Typography
                  className="dIL-paper-content-detail"
                  variant="subtitle1"
                >{`Phone number : ${doctor.phone}`}</Typography>
                <Typography
                  className="dIL-paper-content-detail"
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
