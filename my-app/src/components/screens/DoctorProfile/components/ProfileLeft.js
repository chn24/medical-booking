import { Box } from '@mui/material'
import { useContext } from 'react'

import InformtionTab from './InformationTab'
import CommentTab from './CommentTab'

import { TabContext } from './Body'

function ProfileLeft() {
  const tabContext = useContext(TabContext)

  return (
    <Box className="pL">
      <Box className="pL-Bg"></Box>
      <Box className="pL-content">{tabContext.tab === 'profile' ? <InformtionTab /> : <CommentTab />}</Box>
    </Box>
  )
}

export default ProfileLeft
