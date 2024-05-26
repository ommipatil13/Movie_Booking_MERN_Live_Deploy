import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { Box } from '@mui/system';
import { getAllMovies } from '../api_helpers/api_helpers';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

// const dummyArray = ["memory", "GOD", "RE"]

const Header = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const [value, setValue] = useState()
    const [movies, setMovies] = useState([])


    const handleChange = (e, val) => {

        const movie = movies.find((m) => m.title === val)
        // console.log(movie)
        if (isUserLoggedIn) {
            navigate(`/booking/${movie._id}`)
        }
    }

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data.movies)).catch(error => console.log(error))
    }, [])

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout())
    }

    return (
        <AppBar position='sticky' sx={{ bgcolor: "#900C3F", borderRadius: "50px" }} >
            <Toolbar>
                <Box width={"10%"}  >
                    <IconButton sx={{ color: 'white' }} LinkComponent={Link} to='/' >
                        <MovieIcon />
                    </IconButton>
                </Box>
                <Box width={"30%"} margin={'auto'}>
                    <Autocomplete
                        onChange={handleChange}
                        freeSolo
                        options={movies && movies.map((option) => option.title)}
                        renderInput={(params) =>
                            <TextField sx={{ input: { color: "white" } }} variant="standard" {...params} placeholder="Search Films" />}
                    />
                </Box>
                <Box display={'flex'}>
                    <Tabs value={value} indicatorColor='secondary' textColor='inherit' onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to='/movies' label='Films' />
                        {
                            !isAdminLoggedIn && !isUserLoggedIn && <>
                                <Tab LinkComponent={Link} to='/admin' label='Admin' />
                                <Tab LinkComponent={Link} to='/auth' label='User' />
                            </>
                        }
                        {
                            isUserLoggedIn && <>
                                <Tab LinkComponent={Link} to='/user' label='Profile' />
                                <Tab LinkComponent={Link} to='/' label='Logout' onClick={() => logout(false)} />
                            </>
                        }
                        {
                            isAdminLoggedIn && <>
                                <Tab LinkComponent={Link} to='/add' label='Create Film' />
                                <Tab LinkComponent={Link} to='/user-admin' label='Profile' />
                                <Tab LinkComponent={Link} to='/' label='Logout' onClick={() => logout(true)} />
                            </>
                        }
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header