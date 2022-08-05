import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { BookingData } from "./BookingLeft";
import logo from "../pic/logo.png"
import { useNavigate } from "react-router-dom";

function BookingComplete(props) {
    
    const context = useContext(BookingData)
    const {activeStep, setActiveStep} = props
    const navigate = useNavigate()
    console.log(context);

    const handleBooking = () => {
        context.setCustomer({
            title : '',
            firstName : {
                value : '',
                isChanged : false,
                error : false
            },
            lastName : {
                value : '',
                isChanged : false,
                error : false
            },
            name : '',
            email : '',
            phoneNumber : {
                value : '',
                isChanged : false,
                error : {
                    isError : false,
                    required : false,
                    justNumber : false,
                    notNum : 0,
                    length : false
                }
            }
        })
        context.setBooking({
            doctorName : {
                value : null,
                isChoosen : false,
                error : false
            },
            date : {
                value : null,
                day : '',
                month : '',
                year : '',
                isChoosen : false,
                error : null
            },
            time : {
                value : null,
                isChoosen : false,
                error : false
            },
            doctorTimes : ['Morning','Afternoon'],
            morning : [],
            afternoon : [],
            full : []
        })
        context.setDoctorList([])
        setActiveStep(0);
    }

    const handleHome = () => {
        navigate('/')
    }

    return (
        <Box sx={{
            padding:'16px ',
            boxSizing : 'border-box'
        }}>
            <Box>
                <Typography variant="h5" sx={{textAlign : 'center'}} >Thank you for using our service</Typography>
                <Typography variant="subtitle1" sx={{textAlign : 'center'}} >Here is your booking information</Typography>
            </Box>
            <Box sx={{
                display : 'flex'
            }}>
                <Box
                    component='form'
                    sx={{
                        '& > :not(style)': { m: 1 },
                        position : 'relative',
                        width : '65%'
                        // display:'flex',
                        // flexDirection: 'column'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box 
                        sx={{
                            display : 'flex',
                            alignItems : 'center'
                        }}
                    >
                        <Typography variant="h6" sx={{width : 'max-content'}}>Your name : </Typography>
                        <TextField variant="standard" disabled defaultValue={`${context.customer.name}`}></TextField>
                    </Box>
                    <Box 
                        sx={{
                            display : 'flex',
                            alignItems : 'center'
                        }}
                    >
                        <Typography variant="h6" sx={{width : 'max-content'}}>Your doctor : </Typography>
                        <TextField variant="standard" disabled defaultValue={`${context.booking.doctorName.value.name}`}></TextField>
                    </Box>
                    <Box 
                        sx={{
                            display : 'flex',
                            alignItems : 'center'
                        }}
                    >
                        <Typography variant="h6" sx={{width : 'max-content'}}>Date : </Typography>
                        <TextField variant="standard" disabled 
                        defaultValue={`${context.booking.time.value} ${context.booking.date.day} ${context.booking.date.month} ${context.booking.date.year} 
                        `}></TextField>
                    </Box>
                </Box>
                <Box sx={{width : '35%'}}>
                    <img src={logo} alt="" style={{width : '75%' }} />
                </Box>
            </Box>
            <Box sx={{
                display : 'flex',
                justifyContent : 'space-between'
            }}>
                <Button onClick={handleBooking}>Booking</Button>
                <Button onClick={handleHome}>Home</Button>
            </Box>
        </Box>
    )
}

export default BookingComplete;