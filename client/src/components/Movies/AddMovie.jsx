import React, { useState } from 'react';
import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material';
import { addMovie } from '../../api_helpers/api_helpers';

const AddMovie = () => {

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        posterUrl: '',
        releaseDate: '',
        // actor: '',
        featured: false
    })

    const [actors, setActors] = useState([])
    const [actor, setActor] = useState('')

    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addMovie({ ...inputs, actors }).then((res) => console.log("movie added")).catch((error) => console.log(error))

    }

    return (
        <div >
            <form onSubmit={handleSubmit}  >
                <Box width={'50%'} padding={8} margin='auto' display={'flex'} flexDirection={'column'}
                    borderRadius={6} marginTop={4} marginBottom={4} bgcolor={'#27272a'}
                    sx={{ Input: { bgcolor: '#111', borderRadius: '40px', padding: '8px', color: 'white', "::placeholder": { color: 'white' }, ":focus": { bgcolor: 'white', color: 'black', "::placeholder": { color: 'black' } } } }}
                >
                    <Typography textAlign={'center'} variant='h4' fontFamily={'verdana'}  >
                        Create Film
                    </Typography>

                    <FormLabel sx={{ mt: 6, color: 'white' }} >Title:</FormLabel>
                    <TextField placeholder='Enter film title' InputProps={{ disableUnderline: true, "&::placeholder": { color: 'white' } }} value={inputs.title} onChange={handleChange} name='title' variant='standard' margin='normal' ></TextField>

                    <FormLabel sx={{ mt: 2, color: 'white' }} >Description:</FormLabel>
                    <TextField placeholder='Write film description' InputProps={{ disableUnderline: true, }} value={inputs.description} onChange={handleChange} name='description' variant='standard' margin='normal' ></TextField>

                    <FormLabel sx={{ mt: 2, color: 'white' }} >Poster Url:</FormLabel>
                    <TextField placeholder='film url' InputProps={{ disableUnderline: true, }} value={inputs.posterUrl} onChange={handleChange} name='posterUrl' variant='standard' margin='normal' ></TextField>

                    <FormLabel sx={{ mt: 2, color: 'white' }} >Release Date:</FormLabel>
                    <TextField InputProps={{ disableUnderline: true, }} type='date' value={inputs.releaseDate} onChange={handleChange} name='releaseDate' variant='standard' margin='normal' ></TextField>

                    <FormLabel sx={{ mt: 2, color: 'white' }} >Actor:</FormLabel>
                    <Box display={'flex'} >
                        <TextField placeholder=' Film cast' InputProps={{ disableUnderline: true, }} value={actor} onChange={(e) => setActor(e.target.value)} name='actor' variant='standard' margin='normal' ></TextField>
                        <Button onClick={() => {
                            setActors([...actors, actor])
                            setActor('')
                        }} sx={{
                            bgcolor: '#900C3F', color: 'white', borderRadius: '40px', marginLeft: '10px',
                            transition: 'all 0.2s ease', ":hover": { bgcolor: '#900C3F', scale: '1.05' }
                        }} >
                            Add</Button>
                    </Box>

                    <FormLabel sx={{ mt: 2, color: 'white' }} >Featured: <Checkbox name='featured' checked={inputs.featured}
                        onClick={(e) => setInputs((prevState) => ({ ...prevState, featured: e.target.checked }))} sx={{ mr: 'auto', color: 'white' }} /></FormLabel>


                    <Button type='submit' variant='contained' sx={{ marginTop: 5, borderRadius: 6 }}  >Add New Movie</Button>

                </Box>
            </form>
        </div >
    )
}

export default AddMovie