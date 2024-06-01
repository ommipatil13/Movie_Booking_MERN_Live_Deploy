import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getAllMovies } from '../../api_helpers/api_helpers'
import MovieItem from './MovieItem'

const Movies = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data.movies)).catch(error => console.log(error))
    }, [])

    return (
        <Box margin={'auto'} marginTop={4}>
            <Typography
                variant='h4' margin={'auto'} padding={2} textAlign={'center'} width={"40%"} borderRadius={'50px'} color="white"
                bgcolor={'#900C3F'} >
                Films
            </Typography>

            <Box width={'100%'} margin={'auto'} marginTop={5} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} >
                {movies && movies.map((movie, index) => <MovieItem key={index} id={movie._id}
                    posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} title={movie.title} />)}
            </Box>

        </Box>
    )
}

export default Movies