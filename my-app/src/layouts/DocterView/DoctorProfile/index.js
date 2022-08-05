import { Box, Grid } from '@mui/material'
import { createContext, useState } from 'react'
import LPNav from '../../LandingPage/LPNav'
import ProfileLeft from './ProfileLeft'
import ProfileRight from './ProfileRight'

function index() {
  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight}px`,
        backgroundColor: 'rgb(240, 242, 245)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <LPNav />
      <Box
        sx={{
          height: `max-content`,
          padding: '48px 64px 48px',
        }}
      >
        <Grid container>
          <Grid item xs={9}>
            <ProfileLeft />
          </Grid>
          <Grid item xs={3}>
            <ProfileRight />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default index
