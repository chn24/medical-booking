import { Box, Grid } from '@mui/material'
import ProfileLeft from './ProfileLeft'
import ProfileRight from './ProfileRight'
import LoadingPage from '../../LoadingPage'

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
      <Box className="profile-body">
        <Box className="profile-body-container">
          <Box className="profile-body-item-1">
            <ProfileLeft />
          </Box>
          <Box className="profile-body-item-2">
            <ProfileRight />
          </Box>
        </Box>
      </Box>
    </TabContext.Provider>
  )
}

export default Body
