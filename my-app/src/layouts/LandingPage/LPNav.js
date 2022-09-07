import AccountIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import ListIcon from '@mui/icons-material/FormatListBulleted'
import LPNavIcon from './LPNavIcon'
import LoadingPage from '../LoadingPage'

import {
  Breadcrumbs,
  ClickAwayListener,
  Divider,
  Drawer,
  List,
  ListItemButton,
  Skeleton,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import { TextField, Box, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { loginState } from '../../recoil/loginState'
import { dataState } from '../../recoil/dataState'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const docNav = [
  {
    id: 1,
    title: 'Home',
    to: '/',
  },
  {
    id: 2,
    title: 'Your Schedules',
    to: '/your-schedule',
  },
  {
    id: 3,
    title: 'Your Profile',
    to: '/your-profile',
  },
  {
    id: 4,
    title: 'News',
    to: '/news',
  },
]
const userNav = [
  {
    id: 1,
    title: 'Home',
    to: '/',
  },
  {
    id: 2,
    title: 'Your Bookings',
    to: '/your-booking',
  },
  {
    id: 3,
    title: 'News',
    to: '/news',
  },
]

function LPNav(props) {
  const { tabs } = props
  const loginData = useRecoilValue(dataState)
  const isLogin = useRecoilValue(loginState)
  // console.log(loading)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [drawer, setDrawer] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickAway = () => {
    if (open) {
      setOpen(false)
    }
  }

  const handleDrawerClick = () => {
    setDrawer(true)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      className="nav"
      sx={{
        backgroundColor: `${scroll ? 'rgba(255, 255, 255, 0.8)' : 'rgb(240, 242, 245)'}`,
        boxShadow: `${
          scroll
            ? 'rgb(255 255 255 / 90%) 0rem 0rem 0.0625rem 0.0625rem inset,rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem'
            : ''
        }`,
        backdropFilter: `${scroll ? 'saturate(200%) blur(1.875rem)' : ''}`,
      }}
    >
      <Box className=" nav-container">
        <Box className="nav-left">
          <IconButton onClick={handleDrawerClick}>
            <ListIcon />
          </IconButton>
          <Drawer open={drawer} onClose={() => setDrawer(false)}>
            <Box className="nav-left-drawerBox">
              {isLogin.roll === 'Doctor'
                ? docNav.map((item) => {
                    return (
                      <NavLink className="nav-left-link" key={item.id} to={item.to}>
                        {item.title}
                      </NavLink>
                    )
                  })
                : userNav.map((item) => {
                    return (
                      <NavLink className="nav-left-link" key={item.id} to={item.to}>
                        {item.title}
                      </NavLink>
                    )
                  })}
            </Box>
          </Drawer>
        </Box>
        <Box className="nav-middle">
          {isLogin.roll === 'Doctor'
            ? docNav.map((item) => {
                return (
                  <NavLink className="nav-middle-link" key={item.id} to={item.to}>
                    {item.title}
                  </NavLink>
                )
              })
            : userNav.map((item) => {
                return (
                  <NavLink className="nav-middle-link" key={item.id} to={item.to}>
                    {item.title}
                  </NavLink>
                )
              })}
        </Box>
        <Box className="nav-right">
          <ClickAwayListener onClickAway={handleClickAway}>
            {isLogin.login && loginData.roll === '' ? (
              <div
                style={{
                  width: '40px',
                  height: '40px',
                }}
              >
                <Skeleton variant="circular" animation="wave" width="40px" height="40px" />
              </div>
            ) : (
              <Box sx={{ position: 'relative' }}>
                <IconButton aria-label="User" onClick={handleClick}>
                  <AccountIcon />
                </IconButton>
                {open ? <LPNavIcon open={open} setOpen={setOpen} /> : null}
              </Box>
            )}
          </ClickAwayListener>
        </Box>
      </Box>
    </Box>
  )
}

export default LPNav

/*
<Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box
            alignItems={"center"}
            className={styles}
            sx={{ width: "max-content" }}
          >
            <TextField
              id="standard-basic"
              placeholder="Search"
              variant="standard"
            />
            <IconButton aria-label="Search" className={styles.icon_button}>
              <SearchIcon />
            </IconButton>
          </Box>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: "relative" }}>
              <IconButton aria-label="User" onClick={handleClick}>
                <AccountIcon />
              </IconButton>
              {open ? <LPNavIcon /> : null}
            </Box>
          </ClickAwayListener>
        </Box>
*/
