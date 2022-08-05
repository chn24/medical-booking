import { Fade } from '@mui/material'
import { Avatar, Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import { dataState } from '../../../recoil/dataState'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import './assets/scss/index.scss'
import ava from './assets/img/ava.jpg'
import { useState } from 'react'

function InformtionTab() {
  const [loginData, setLogiData] = useRecoilState(dataState)
  const [userData, setUserData] = useState({
    email: {
      value: loginData.information.email,
      error: false,
    },
    phone: {
      value: loginData.information.phone,
      error: false,
    },
    website: {
      value: loginData.information.website,
      error: false,
    },
    hospital: {
      value: loginData.information?.company?.name,
      error: false,
    },
    street: {
      value: loginData.information?.address?.street,
      error: false,
    },
    city: {
      value: loginData.information?.address?.city,
      error: false,
    },
  })
  const [disabled, setDisabled] = useState(true)

  const handleChange = (value, type) => {
    switch (type) {
      case 'email':
        setUserData({
          ...userData,
          email: {
            value: value,
            error: value.length === 0 ? true : false,
          },
        })
        break
      case 'phone':
        setUserData({
          ...userData,
          phone: {
            value,
            error: value.length === 0 ? true : false,
          },
        })
        break
      case 'website':
        setUserData({
          ...userData,
          website: {
            value,
            error: value.length === 0 ? true : false,
          },
        })
        break
      case 'hospital':
        setUserData({
          ...userData,
          hospital: {
            value,
            error: value.length === 0 ? true : false,
          },
        })
        break
      case 'street':
        setUserData({
          ...userData,
          street: {
            value,
            error: value.length === 0 ? true : false,
          },
        })
        break
      default:
        setUserData({
          ...userData,
          city: {
            value,
            error: value.length === 0 ? true : false,
          },
        })
    }
  }

  const handleSave = () => {
    let error = false
    for (let key in userData) {
      if (userData[key].error) {
        error = true
        break
      }
    }
    if (!error) {
      setLogiData({
        ...loginData,
        information: {
          ...loginData.information,
          phone: userData.phone.value,
          email: userData.email.value,
          website: userData.email.value,
          address: {
            ...loginData.information.address,
            city: userData.city.value,
            street: userData.street.value,
          },
          company: {
            ...loginData.information.company,
            name: userData.hospital.value,
          },
        },
      })
      setDisabled(true)
    }
  }

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="avatar"
          src={ava}
          sx={{
            width: '5rem',
            height: 'auto',
          }}
        />
        <Stack
          sx={{
            padding: '0 0 0 1.5rem',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'rgb(52, 71, 103)',
            }}
          >
            {loginData.information.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgb(123, 128, 154)',
            }}
          >
            Doctor
          </Typography>
        </Stack>

        {!disabled ? (
          <Box
            sx={{
              minWidth: '20%',
              margin: '0 0 0 auto',
            }}
          >
            <Button
              variant="contained"
              sx={{
                margin: '0 8px',
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{
                margin: '0 8px',
              }}
              onClick={() => setDisabled(true)}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{
              margin: '0 0 0 auto',
            }}
            onClick={() => setDisabled(false)}
          >
            Edit your profile
          </Button>
        )}
      </Box>
      <Divider
        sx={{
          margin: '1rem 0',
        }}
      />
      <Box className="infor-container">
        <Typography variant="h4" className="infor-header">
          Contact information
        </Typography>
        <Box className="infor-box">
          <Typography variant="subtitle1" className="infor-box-title">
            Email
          </Typography>
          <TextField
            variant="outlined"
            className="infor-box-detail"
            error={userData.email.error}
            disabled={disabled}
            value={`${userData.email.value}`}
            onChange={(e) => handleChange(e.target.value, 'email')}
          ></TextField>
        </Box>
        <Box className="infor-box">
          <Typography variant="subtitle1" className="infor-box-title">
            Phone number
          </Typography>
          <TextField
            variant="outlined"
            className="infor-box-detail"
            error={userData.phone.error}
            disabled={disabled}
            value={userData.phone.value}
            onChange={(e) => handleChange(e.target.value, 'phone')}
          ></TextField>
        </Box>
        <Box className="infor-box">
          <Typography variant="subtitle1" className="infor-box-title">
            Website
          </Typography>
          <TextField
            variant="outlined"
            className="infor-box-detail"
            error={userData.website.error}
            disabled={disabled}
            value={`${userData.website.value}`}
            onChange={(e) => handleChange(e.target.value, 'website')}
          ></TextField>
        </Box>
        <Box className="infor-box">
          <Typography variant="subtitle1" className="infor-box-title">
            Hospital
          </Typography>
          <TextField
            variant="outlined"
            className="infor-box-detail"
            error={userData.hospital.error}
            disabled={disabled}
            value={`${userData.hospital.value}`}
            onChange={(e) => handleChange(e.target.value, 'hospital')}
          ></TextField>
        </Box>
      </Box>
      <Box className="infor-container">
        <Typography variant="h4" className="infor-header">
          Address
        </Typography>
        <Box className="infor-box">
          <Typography variant="subtitle1" className="infor-box-title" disabled={disabled}>
            Street
          </Typography>
          <TextField
            variant="outlined"
            className="infor-box-detail"
            error={userData.street.error}
            disabled={disabled}
            value={`${userData.street.value}`}
            onChange={(e) => handleChange(e.target.value, 'street')}
          ></TextField>
        </Box>
        <Box className="infor-box">
          <Typography variant="subtitle1" className="infor-box-title">
            City
          </Typography>
          <TextField
            variant="outlined"
            className="infor-box-detail"
            error={userData.city.error}
            disabled={disabled}
            value={`${userData.city.value}`}
            onChange={(e) => handleChange(e.target.value, 'city')}
          ></TextField>
        </Box>
      </Box>
    </Stack>
  )
}

export default InformtionTab
