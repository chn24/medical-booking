import { Avatar, Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import './assets/scss/index.scss'
import { dataState } from '../../../recoil/dataState'
import { profileTab } from '../../../recoil/profileTab'
import { useRecoilValue } from 'recoil'
import { createContext, useState } from 'react'

import InformtionTab from './InformationTab'
import CommentTab from './CommentTab'

export const CommentsContext = createContext()

function ProfileLeft() {
  const loginData = useRecoilValue(dataState)
  const profileTabData = useRecoilValue(profileTab)
  const [comments, setComments] = useState([])

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      <Box>
        <Box id="profileBg"></Box>
        <Box
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
          {profileTabData === 'profile' ? <InformtionTab /> : <CommentTab />}
        </Box>
      </Box>
    </CommentsContext.Provider>
  )
}

export default ProfileLeft
