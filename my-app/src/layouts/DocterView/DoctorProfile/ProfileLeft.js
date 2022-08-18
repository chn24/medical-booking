import { Box } from '@mui/material'
import './assets/scss/index.scss'
import { createContext, useContext, useState } from 'react'

import InformtionTab from './InformationTab'
import CommentTab from './CommentTab'

import { TabContext } from './Body'

export const CommentsContext = createContext()

function ProfileLeft() {
  const tabContext = useContext(TabContext)
  const [comments, setComments] = useState([])

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
    <CommentsContext.Provider value={{ comments, setComments }}>
      <Box>
        <Box id="profileBg"></Box>
        <Box
          className="profile-content"
          sx={{
            padding: '1.5rem',
            margin: '-4rem 1.5rem 0',
            zIndex: '1',
            backgroundColor: 'rgb(255, 255, 255);',
            boxShadow:
              ' rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
            borderRadius: '15px',
          }}
        >
          {tabContext.tab === 'profile' ? <InformtionTab /> : <CommentTab />}
        </Box>
      </Box>
    </CommentsContext.Provider>
  )
}

export default ProfileLeft
