import { Box, Divider, Grid, Paper, Rating, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ava1 from '../pic/ava1.jpg'
import ava2 from '../pic/ava2.jpg'
import ava3 from '../pic/ava3.png'
import InformationRight from './InformationRight'

const Height = window.innerHeight - 64
const rand = Math.floor(Math.random() * 3)
const avaList = [ava1, ava2, ava3]
function Main(props) {
  const params = useParams()
  const { doctor, star } = props
  return (
    <Box>
      <Grid
        container
        sx={{
          height: '98%',
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1% 0',
            height: '98%',
          }}
        >
          <Paper
            sx={{
              width: '90%',
              padding: '5px',
              borderRadius: '15px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={avaList[rand]}
                alt=""
                style={{
                  maxWidth: '65%',
                  borderRadius: '50%',
                }}
              />
            </Box>
            <Box>
              <Typography variant="h3">{`Dr.${doctor.name}`}</Typography>
              <Divider></Divider>
              <Box
                sx={{
                  margin: '10px 0',
                }}
              >
                <Typography variant="h4">{`Hospital`}</Typography>
                <Typography variant="h5">{`${doctor?.company?.name}`}</Typography>
              </Box>
              <Box
                sx={{
                  margin: '10px 0',
                }}
              >
                <Typography variant="h4">{`Contact :`}</Typography>
                <Typography variant="subtitle1">{`Phone number : ${doctor.phone}`}</Typography>
                <Typography variant="subtitle1">{`Email : ${doctor.email}`}</Typography>
              </Box>
              <Typography component="legend">Rating</Typography>
              <Rating value={star} readOnly />
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            margin: '1% 0',
            height: '98%',
          }}
        >
          <InformationRight docId={doctor.id} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Main
