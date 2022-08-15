import { Box, Grid } from '@mui/material'
import ProfileLeft from './ProfileLeft'
import ProfileRight from './ProfileRight'
import LoadingPage from '../../LoadingPage'

import { dataState } from '../../../recoil/dataState'
import { useRecoilValue } from 'recoil'

function Body() {
  const loginData = useRecoilValue(dataState)
  return loginData.roll === '' ? (
    <LoadingPage />
  ) : (
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
  )
}

export default Body
