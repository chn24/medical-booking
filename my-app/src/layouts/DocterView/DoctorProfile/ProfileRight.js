import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import './assets/scss/index.scss'
import { profileTab } from '../../../recoil/profileTab'
import { useRecoilState } from 'recoil'

function ProfileRight() {
  const [profileTabData, setProfileTabData] = useRecoilState(profileTab)
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
            <Button
              disabled={profileTabData === 'profile'}
              className="options-button"
              onClick={() => setProfileTabData('profile')}
            >
              Profile
            </Button>
            <Divider />
          </Box>
          <Box>
            <Button
              disabled={profileTabData === 'comment'}
              className="options-button"
              onClick={() => setProfileTabData('comment')}
            >
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
