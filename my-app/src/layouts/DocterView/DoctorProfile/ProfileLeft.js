import { Box } from '@mui/material'
import { useContext } from 'react'

import InformtionTab from './InformationTab'
import CommentTab from './CommentTab'

import { TabContext } from './Body'

function ProfileLeft() {
  const tabContext = useContext(TabContext)

  // useEffect(() => {
  //   profileTabData === 'profile'
  //     ? setSearchParams(createSearchParams({ tab: 'profile' }))
  //     : setSearchParams(createSearchParams({ tab: 'comments' }))
  // }, [profileTabData])
  // for (const entry of searchParams.entries()) {
  //   const [param, value] = entry
  //   console.log(param, value)
  // }

  return (
    <Box className="pL">
      <Box className="pL-Bg"></Box>
      <Box className="pL-content">{tabContext.tab === 'profile' ? <InformtionTab /> : <CommentTab />}</Box>
    </Box>
  )
}

export default ProfileLeft
