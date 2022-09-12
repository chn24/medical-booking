import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import { useEffect, useState } from 'react'
import { Alert } from '@mui/material'

export default function SignInAlert({ ...prop }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (prop.in) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [prop.in])

  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  return (
    <Box className="sIAlert">
      <Box className="sIAlert-box">
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <Paper sx={{ m: 1 }} elevation={4}>
            <Box>
              <Alert severity="error" onClose={() => prop.changeAlert(false)}>
                {prop.title}
              </Alert>
            </Box>
          </Paper>
        </Slide>
      </Box>
    </Box>
  )
}
