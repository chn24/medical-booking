import { Box, Grid } from '@mui/material'
import ProfileLeft from './ProfileLeft'
import ProfileRight from './ProfileRight'
import LoadingPage from '../../LoadingPage'

import './assets/scss/responsive.scss'

import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'
import { createContext, useState } from 'react'

export const TabContext = createContext()

function Body() {
  const loginData = useRecoilValue(dataState)
  const [tab, setTab] = useState('profile')
  return loginData.roll === '' ? (
    <LoadingPage />
  ) : (
    <TabContext.Provider value={{ tab, setTab }}>
      <Box
        className="profile-body"
        sx={{
          height: `max-content`,
          padding: '48px 64px 48px',
        }}
      >
        <Box
          className="profile-container"
          sx={{
            display: 'flex',
          }}
        >
          <Box
            className="profile-item-1"
            sx={{
              width: '75%',
            }}
          >
            <ProfileLeft />
          </Box>
          <Box
            className="profile-item-2"
            sx={{
              width: '25%',
            }}
          >
            <ProfileRight />
          </Box>
        </Box>
      </Box>
    </TabContext.Provider>
  )
}

export default Body
