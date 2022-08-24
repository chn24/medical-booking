import { useContext } from 'react'
import { LogginContext } from '../../App'
import NoAccountIcon from '@mui/icons-material/NoAccounts'
import LoginIcon from '@mui/icons-material/Login'
import { Box, ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import LoggedInNavIcon from './LoggedInNavIcon'
import { loginState } from '../../recoil/loginState'

import { useRecoilValue } from 'recoil'

function LPNavIcon(props) {
  const { open, setOpen } = props
  const navigate = useNavigate()
  const isLogin = useRecoilValue(loginState)

  const flexRowStylesLink = {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    width: '100%',
  }

  const boxStyles = {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    p: 1,
    bgcolor: '#fff',
    with: 'max-content',
    boxShadow: 'rgb(255 255 255 / 90%) 0rem 0rem 0.0625rem 0.0625rem inset,rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
    borderRadius: '15px',
  }

  const handleLogin = () => {
    navigate('/signIn')
  }

  const handleRegister = () => {
    navigate('./signUp')
  }
  return (
    <List sx={boxStyles} disablePadding>
      {isLogin.login ? (
        <LoggedInNavIcon open={open} setOpen={setOpen} />
      ) : (
        <>
          <ListItem disablePadding>
            <NavLink to="/signIn" style={flexRowStylesLink}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" sx={{ color: '#000' }} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <NavLink to="/signUp" style={flexRowStylesLink}>
                <ListItemIcon>
                  <NoAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Register" sx={{ color: '#000' }} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  )
}

export default LPNavIcon
