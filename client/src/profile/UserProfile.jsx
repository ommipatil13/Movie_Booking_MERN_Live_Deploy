import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api_helpers/api_helpers'
import { Box } from '@mui/system';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UserProfile = () => {

    const [bookings, setBookings] = useState('')
    const [user, setUser] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        getUserBooking().then((res) => setBookings(res.bookings)).catch((error) => console.log(error))

        getUserDetails().then((res) => setUser(res.user)).catch((error) => console.log(error))
    }, [])


    const handleDelete = (id) => {

        deleteBooking(id).then((res) => console.log('delete')).catch((error) => console.log(error));
        window.location.reload();
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const id = user._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateUser = await axios.put(`/user/${id}`, user).catch((error) => console.log(error))

        if (updateUser.status !== 200) {
            return console.log('No Data')
        }
        const resData = await updateUser.data;
        return resData;
    }

    return (
        <Box width={'100%'} display={'flex'} >


            <Fragment>


                {user &&
                    < Box width={'30%'} padding={3} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                        <ManageAccountsIcon sx={{ fontSize: '10rem', ml: 15 }} />

                        {/* <Typography padding={1} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6} >
                        Name: {user.name}
                        </Typography>
                        <Typography marginTop={1} padding={1} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6} >
                        Email: {user.email}
                    </Typography> */}

                        <form onSubmit={handleSubmit} >
                            <TextField sx={{ border: '1px solid #ccc', width: '100%', borderRadius: 6, Input: { color: 'white', textAlign: "center" } }}
                                placeholder='Name' variant='standard' type='text' name='name'
                                value={user.name} onChange={handleChange}
                                InputProps={{ disableUnderline: true }} />

                            <TextField sx={{ border: '1px solid #ccc', mt: 2, width: '100%', borderRadius: 6, Input: { color: 'white', textAlign: "center" } }}
                                placeholder='Email' variant='standard' type='text' name='email'
                                value={user.email} onChange={handleChange}
                                InputProps={{ disableUnderline: true }} />

                            <Button type='submit' variant='contained' sx={{ marginTop: 3, borderRadius: 6, width: '100%', backgroundColor: '#900C3F' }}  >
                                Update </Button>
                        </form>

                    </Box>
                }

                {bookings && bookings.length > 0 && < Box width={'70%'} display={'flex'} flexDirection={'column'} >

                    <Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2} >Bookings</Typography>
                    <Box width={'80%'} margin={'auto'} display={'flex'} flexDirection={'column'} >
                        <List>
                            {
                                bookings.map((booking, index) => (
                                    <ListItem sx={{ bgcolor: '#900C3F', color: 'white', textAlign: 'center', margin: 1, borderRadius: 8 }} >
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Film: {booking.movie.title}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Seat Number: {booking.seatNumber}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Date: {new Date(booking.date).toDateString()}
                                        </ListItemText>
                                        <IconButton sx={{ color: 'white' }} onClick={() => handleDelete(booking._id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>

                </Box>}

            </Fragment >



        </Box >
    )
}

export default UserProfile 