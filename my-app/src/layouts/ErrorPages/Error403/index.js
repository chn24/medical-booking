import { Box, Button } from '@mui/material'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function index() {
  // const navigate = useNavigate()
  return (
    <Box className="errorPage" sx={{ height: `${window.innerHeight}px` }}>
      <Box className="errorPage-container">
        <Box className="errorPage-header">
          <span className="errorPage-header-errorType">403</span>
          <span className="errorPage-header-errorTitle">No Duty Exemption </span>
          {/* <span className="errorPage-header-errorTitle">What are you doing here ?</span> */}
        </Box>
        <Box className="errorPage-403 errorPage-bg"></Box>
        <Box className="errorPage-button">
          <NavLink className="errorPage-button-link" to="/">
            <Button variant="contained">Back to home</Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  )
}

export default index
