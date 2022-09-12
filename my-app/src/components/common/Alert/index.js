import { Alert, Box, Slide } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { alertState } from '../../../recoil/alertState'

function CommonAlert({ direction }) {
  const alertInfo = useRecoilValue(alertState)
  return (
    <Box className="error">
      <Slide direction={direction} in={alertInfo.open} mountOnEnter unmountOnExit>
        <Alert severity={alertInfo?.type}>
          <Box className="error-info">
            {Object.entries(alertInfo?.information).map((info, index) => {
              console.log(info[1])
              return <span key={index}>{info[1]}</span>
            })}
          </Box>
        </Alert>
      </Slide>
    </Box>
  )
}

export default CommonAlert
