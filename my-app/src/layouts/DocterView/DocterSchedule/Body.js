import { Box, Button, FormControl, Grid } from '@mui/material'
import { useState } from 'react'
import LPNav from '../../LandingPage/LPNav'
import DSLeft from './DSLeft'
import DSRight from './DSRight'
import ResDialog from './ResDialog'

function Body() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Box
      className="ds-body"
      sx={{
        height: `max-content`,
        padding: '48px 64px 0',
      }}
    >
      <Box
        className="ds-body-container"
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          className="mobileDisplay"
          sx={{
            marginBottom: '32px',
            width: 'max-content',
            display: 'none',
          }}
          onClick={() => setOpenDialog(true)}
        >
          Add new schedule
        </Button>
        <ResDialog open={openDialog} setOpen={setOpenDialog} />
        <Box
          className="ds-body-item ds-body-item-disNone"
          sx={{
            width: '33%',
          }}
        >
          <DSLeft />
        </Box>
        <Box
          className="ds-body-item"
          sx={{
            width: '67%',
          }}
        >
          <DSRight />
        </Box>
      </Box>
    </Box>
  )
}

export default Body
