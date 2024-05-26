import React, { Fragment, useEffect, useState } from 'react'
import { getAdminById, } from '../api_helpers/api_helpers'
import { Box } from '@mui/system';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const AdminProfile = () => {

    const [admin, setAdmin] = useState('')

    useEffect(() => {
        getAdminById().then((res) => setAdmin(res.admin)).catch((error) => console.log(error))
    }, [])

    console.log(admin)

    return (
        <Box width={'100%'} display={'flex'} >


            <Fragment>

                {admin && < Box width={'30%'} padding={3} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                    <AdminPanelSettingsIcon sx={{ fontSize: '10rem', ml: 15 }} />

                    <Typography marginTop={1} padding={1} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6} >
                        Email: {admin.email}
                    </Typography>
                </Box>}

                {admin && admin.addedMovies.length > 0 && < Box width={'70%'} display={'flex'} flexDirection={'column'} >

                    <Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2} >Added Films</Typography>
                    <Box width={'80%'} margin={'auto'} display={'flex'} flexDirection={'column'} >
                        <List>
                            {
                                admin.addedMovies.map((movie, index) => (
                                    <ListItem sx={{ bgcolor: '#900C3F', color: 'white', textAlign: 'center', margin: 1, borderRadius: 8 }} >
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Film: {movie.title}
                                        </ListItemText>



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

export default AdminProfile 