import { Box, Button } from '@mui/material'
import { useLocation, useSearchParams } from 'react-router-dom'
import { TabContext } from './Body'
import { useContext, useEffect } from 'react'

function Options() {
  const tabContext = useContext(TabContext)
  const a = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    a.search === '?tab=profile' || a.search === '' ? tabContext.setTab('profile') : tabContext.setTab('comment')
  }, [a.search])

  const handleTabProfile = () => {
    setSearchParams({ tab: 'profile' })
  }

  const handleTabComments = () => {
    setSearchParams({ tab: 'comment' })
  }

  return (
    <Box className="profile-options">
      <Box>
        <Button disabled={tabContext.tab === 'profile'} className="profile-options-button" onClick={handleTabProfile}>
          Profile
        </Button>
      </Box>
      <Box>
        <Button disabled={tabContext.tab === 'comment'} className="profile-options-button" onClick={handleTabComments}>
          Comments
        </Button>
      </Box>
    </Box>
  )
}

export default Options
