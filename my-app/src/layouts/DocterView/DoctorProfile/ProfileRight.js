import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'

import { useLocation, useSearchParams } from 'react-router-dom'

import { TabContext } from './Body'
import { useContext, useEffect } from 'react'

function ProfileRight() {
  const tabContext = useContext(TabContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const a = useLocation()

  useEffect(() => {
    a.search === '?tab=profile' || a.search === '' ? tabContext.setTab('profile') : tabContext.setTab('comment')
  }, [a.search])

  const handleTabProfile = () => {
    setSearchParams({ tab: 'profile' })
  }

  const handleTabComments = () => {
    setSearchParams({ tab: 'comment' })
  }

  // const useNavigateParams = () => {
  //   const navigate = useNavigate()

  //   return (url, params) => {
  //     const path = generatePath(':url?:queryString', {
  //       url,
  //       queryString: params,
  //     })
  //     navigate(path)
  //   }
  // }

  // const navigate = useNavigateParams()

  return (
    <Box className="pR">
      <Paper className="pR-paper">
        <Box className="pR-paper-head">
          <Typography variant="h5">Options</Typography>
        </Box>
        <Stack>
          <Box>
            <Button
              disabled={tabContext.tab === 'profile'}
              className="profile-options-button"
              onClick={handleTabProfile}
            >
              Profile
            </Button>
            <Divider />
          </Box>
          <Box>
            <Button
              disabled={tabContext.tab === 'comment'}
              className="profile-options-button"
              onClick={handleTabComments}
            >
              Comments
            </Button>
            <Divider />
          </Box>
          <Box>
            <Button className="profile-options-button">Option 3</Button>
            <Divider />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ProfileRight
