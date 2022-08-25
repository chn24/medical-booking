import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { loginState } from '../../recoil/loginState'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { dataState } from '../../recoil/dataState'
import { tabState } from '../../recoil/tabState'
import { profileTab } from '../../recoil/profileTab'

function LoggedInNavIcon(props) {
  const { open, setOpen } = props
  const resetIsLogin = useResetRecoilState(loginState)
  const navigate = useNavigate()
  const resetLoginData = useResetRecoilState(dataState)
  const restProileTab = useResetRecoilState(profileTab)
  const loginData = useRecoilValue(dataState)
  const setDefaultTabName = useResetRecoilState(tabState)

  const handleClick = () => {
    setOpen(!open)
    resetIsLogin()
    resetLoginData()
    setDefaultTabName()
    restProileTab()
    navigate('/')
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemText
          primary={`Hello ${loginData.roll === 'Doctor' ? loginData.information.username : loginData.information.name}`}
          sx={{ color: '#000', textAlign: 'center' }}
        ></ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: '#000' }}></ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default LoggedInNavIcon
