import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useLocation, useSearchParams } from 'react-router-dom'

import './assets/scss/index.scss'
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
    <Box
      sx={{
        padding: '0 16px',
        position: '-webkit-sticky',
        position: 'sticky',
        top: '120px',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
        }}
      >
        <Box
          sx={{
            margin: '-16px 16px 0 16px',
            padding: '16px 16px',
            opacity: '1',
            background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
            color: '#fff',
            borderRadius: '0.5rem',
            boxShadow:
              'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
          }}
        >
          <Typography variant="h5">Options</Typography>
        </Box>
        <Stack>
          <Box>
            <Button disabled={tabContext.tab === 'profile'} className="options-button" onClick={handleTabProfile}>
              Profile
            </Button>
            <Divider />
          </Box>
          <Box>
            <Button disabled={tabContext.tab === 'comment'} className="options-button" onClick={handleTabComments}>
              Comments
            </Button>
            <Divider />
          </Box>
          <Box>
            <Button className="options-button">Option 3</Button>
            <Divider />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ProfileRight
