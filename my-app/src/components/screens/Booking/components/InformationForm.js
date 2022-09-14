import { Autocomplete, Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { bookingState } from '../../../../recoil/bookingState'
import { useRecoilState } from 'recoil'

const titleList = ['Mr', 'Mrs']
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  email: yup.string().email('Enter a valid email').required('Email is requied'),
})

function InformationForm(props) {
  const [bookingIn4, setBookingIn4] = useRecoilState(bookingState)

  const { activeStep, setActiveStep } = props

  const [title, setTitle] = useState(bookingIn4.customer.title)

  const formik = useFormik({
    initialValues: {
      firstName: bookingIn4.customer.firstName,
      lastName: bookingIn4.customer.lastName,
      phoneNumber: bookingIn4.customer.phoneNumber,
      email: bookingIn4.customer.email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!Object.keys(formik.errors).length) {
        let newValues = {
          ...values,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phoneNumber: values.phoneNumber.trim(),
          email: values.email.trim(),
        }
        handleClick(newValues)
      }
    },
  })
  const handleClick = (values) => {
    setBookingIn4({
      ...bookingIn4,
      customer: {
        title,
        firstName: values.firstName,
        lastName: values.lastName,
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phoneNumber: values.phoneNumber,
      },
    })

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <Box
      className="in4Tab"
      sx={{
        padding: '16px ',
        boxSizing: 'border-box',
      }}
    >
      <Box className="in4Tab-header">
        <Typography variant="h5">Your Details</Typography>
      </Box>
      <form className="in4Tab-form" onSubmit={formik.handleSubmit}>
        <FormControl className="in4Tab-form-item1">
          <Stack className="in4Tab-form-item1-1">
            <Typography variant="subtitle1">Title</Typography>
            <Autocomplete
              options={titleList}
              value={title}
              onChange={(event, newValue) => {
                setTitle(newValue)
              }}
              renderInput={(params) => <TextField {...params} placeholder="Title" />}
            />
          </Stack>
          <Stack className="in4Tab-form-item1-2">
            <Typography variant="subtitle1">First Name</Typography>
            <CustomTextField name="firstName" formik={formik} />
          </Stack>
          <Stack className="in4Tab-form-item1-3">
            <Typography variant="subtitle1">Last Name</Typography>
            <CustomTextField name="lastName" formik={formik} />
          </Stack>
        </FormControl>
        <FormControl className="in4Tab-form-item2">
          <Stack className="in4Tab-form-item-4">
            <Typography variant="subtitle1">Email</Typography>
            <CustomTextField name="email" formik={formik} />
          </Stack>
        </FormControl>
        <FormControl className="in4Tab-form-item3">
          <Stack className="in4Tab-form-item-5">
            <Typography variant="subtitle1">Phone number</Typography>
            <CustomTextField name="phoneNumber" formik={formik} />
          </Stack>
        </FormControl>
        <Button className="in4Tab-form-button" type="submit" variant="contained">
          Next
        </Button>
      </form>
    </Box>
  )
}

const CustomTextField = ({ name, formik }) => {
  return (
    <TextField
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
}

export default InformationForm
