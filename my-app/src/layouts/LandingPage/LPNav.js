import styles from './LPNav.module.scss'
import './lpNavResponsive.scss'

import AccountIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'

import { ClickAwayListener, Stack, Typography } from '@mui/material'
import { TextField, Box, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import LPNavIcon from './LPNavIcon'
import { useNavigate } from 'react-router-dom'
import { tabState } from '../../recoil/tabState'
import { useRecoilValue, useResetRecoilState } from 'recoil'

function LPNav() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState(false)
  const tabName = useRecoilValue(tabState)
  const setDefaultTabName = useResetRecoilState(tabState)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickAway = () => {
    if (open) {
      setOpen(false)
    }
  }

  const handleHomeClick = () => {
    setDefaultTabName()
    navigate('/')
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

  const flexRowStylesLink = {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
  }

  const boxStyles = {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: '#fff',
    with: 'max-content',
    borderRadius: '15px',
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '0.75rem',
        backgroundColor: `${scroll ? '#ffffffcc' : 'rgb(240, 242, 245)'}`,
        boxShadow: `${
          scroll
            ? 'rgb(255 255 255 / 90%) 0rem 0rem 0.0625rem 0.0625rem inset,rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem'
            : ''
        }`,
        zIndex: '5',
        margin: ' 0 16px',
        borderRadius: '15px',
      }}
    >
      <Box
        className="nav-res-padLR0"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 32px',
        }}
      >
        <Stack
          sx={{
            width: 'max-content',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={handleHomeClick}>
              <HomeIcon />
            </IconButton>
            <Typography>/</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgb(52, 71, 103)',
              }}
            >
              {tabName}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: '16px',
              }}
            >
              {tabName}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            minWidth: 'max-content',
            width: '30%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Box alignItems={'center'} className={styles} sx={{ width: 'max-content' }}>
            <TextField className="nav-mobile-disnone" id="standard-basic" placeholder="Search" variant="standard" />
            <IconButton aria-label="Search" className={styles.icon_button}>
              <SearchIcon />
            </IconButton>
          </Box>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
              <IconButton aria-label="User" onClick={handleClick}>
                <AccountIcon />
              </IconButton>
              {open ? <LPNavIcon /> : null}
            </Box>
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
