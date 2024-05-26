import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../../api_helpers/api_helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

const Booking = () => {

    const navigate = useNavigate()

    const [movie, setMovie] = useState()

    const id = useParams().id;

    const [inputs, setInputs] = useState({
        seatNumber: '',
        date: ''
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { seatNumber, date } = inputs;
        if (seatNumber === '' || date === '') {
            setOpen(true)
            // return
        }
        else {

            let response = await axios.post(`/payment`)

            if (response && response.status === 200) {
                window.location.href = response.data.url

                newBooking({ ...inputs, movie: movie._id }).then((res) => console.log("book")).catch((error) => console.log(error))
            }
        }

        // navigate('/payment')
    }

    useEffect(() => {
        getMovieDetails(id).then((res) => setMovie(res.movie)).catch((error) => console.log(error))
    }, [id])

    return (
        <div>
            {
                movie && <Fragment>
                    <Typography padding={3} fontFamily={'fantasy'} variant='h4' textAlign={'center'} >
                        Book Ticket of Movie: {movie.title}
                    </Typography>

                    <Box display={'flex'} justifyContent={'center'}  >

                        <Box display={'flex'} justifyContent={'column'} flexDirection={'column'} padding={3} width={'50%'} marginRight={'auto'} >
                            <img style={{ borderRadius: "30px" }} width={'80%'} height={'300px'} src={movie.posterUrl} alt={movie.title} />
                            <Box width={'80%'} marginTop={3} padding={2} >
                                <Typography paddingTop={2} > {movie.description} </Typography>
                                <Typography fontWeight={'bold'} marginTop={1} >Cast: {movie.actors.map((actor) => actor + " ")} </Typography>
                                <Typography fontWeight={'bold'} marginTop={1} >Release Date: {new Date(movie.releaseDate).toDateString()} </Typography>
                            </Box>
                        </Box>

                        <Box width={'50%'} paddingTop={3} sx={{ Input: { bgcolor: 'white', padding: '10px', borderRadius: '20px' } }} >
                            <form onSubmit={handleSubmit} >
                                <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'} >
                                    <FormLabel sx={{ color: 'white' }} >Choose your Seat:</FormLabel>
                                    <TextField placeholder='Enter your Seat' value={inputs.seatNumber} InputProps={{ disableUnderline: true, }} onChange={handleChange} name='seatNumber' type='number' margin='normal' variant='standard' ></TextField>
                                    <FormLabel sx={{ color: 'white' }} >Date:</FormLabel>
                                    <TextField value={inputs.date} InputProps={{ disableUnderline: true, }} onChange={handleChange} name='date' type='date' margin='normal' variant='standard' ></TextField>
                                    <Button type='submit' sx={{
                                        mt: 3, bgcolor: '#900C3F', color: 'white', borderRadius: '40px', marginLeft: '10px',
                                        transition: 'all 0.2s ease', ":hover": { bgcolor: '#900C3F', scale: '1.02' }
                                    }} >Enjoy Movie</Button>
                                </Box>
                            </form>
                        </Box>

                    </Box>

                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message="Please fill all details"
                    />

                </Fragment>
            }
        </div>
    )
}

export default Booking