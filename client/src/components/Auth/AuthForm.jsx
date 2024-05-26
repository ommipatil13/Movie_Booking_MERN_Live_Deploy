import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseRounedIcon from '@mui/icons-material/CloseRounded'
import { Link } from 'react-router-dom';


const labelStyle = { mt: 1, mb: 1, color: 'white' };

const AuthForm = ({ onSubmit, isAdmin }) => {

    const [isSignUp, setIsSignUp] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
        // console.log(inputs)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs)
        onSubmit({ inputs, signup: isAdmin ? false : isSignUp })

    }



    return (
        <Dialog PaperProps={{ style: { borderRadius: 20, backgroundColor: '#27272a' } }} open={true}  >
            <Box sx={{ ml: 'auto', }} >
                <IconButton LinkComponent={Link} to='/' > <CloseRounedIcon /> </IconButton>
            </Box>
            <Typography variant='h4' textAlign={'center'} color={'white'} > {isSignUp ? "Register" : "Login"} </Typography>
            <form onSubmit={handleSubmit} >
                <Box padding={5} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={400} alignContent={'center'}
                    margin={'auto'}
                    sx={{ Input: { bgcolor: '#111', borderRadius: '40px', padding: '8px', color: 'white', "::placeholder": { color: 'white' }, ":focus": { bgcolor: 'white', color: 'black', "::placeholder": { color: 'black' } } } }}
                >

                    {
                        !isAdmin && isSignUp && <>
                            <FormLabel sx={labelStyle} >Name:</FormLabel>
                            <TextField placeholder='Enter your Name' variant='standard' margin='normal' type='text' name='name'
                                value={inputs.name} onChange={handleChange} InputProps={{ disableUnderline: true }} />
                        </>
                    }

                    <FormLabel sx={labelStyle} >Email:</FormLabel>
                    <TextField placeholder='Enter your Email' variant='standard' margin='normal' type='email' name='email'
                        value={inputs.email} onChange={handleChange} InputProps={{ disableUnderline: true }} />

                    <FormLabel sx={labelStyle} >Password:</FormLabel>
                    <TextField placeholder='Enter your Password' variant='standard' margin='normal' type='password' name='password'
                        value={inputs.password} onChange={handleChange} InputProps={{ disableUnderline: true }} />

                    <Button type='submit' fullWidth sx={{ mt: 2, borderRadius: 10, bgcolor: '#C60C31', }} variant='contained' >
                        {isSignUp ? "Register" : "Login"}
                    </Button>

                    {!isAdmin && <Button onClick={() => setIsSignUp(!isSignUp)} fullWidth sx={{ mt: 2, borderRadius: 10 }}  >
                        {isSignUp ? "Already Register Login Here?" : "New User Register Here?"} </Button>}
                </Box>
            </form>
        </Dialog >
    )
}

export default AuthForm