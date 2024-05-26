import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
    return (
        <Card sx={{
            width: 250, height: 300, borderRadius: 5, margin: 1, transition: 'all 0.3s ease', ":hover": {
                boxShadow: "10px 10px 20px #ccc", scale: '1.02'
            }, bgcolor: '#27272a', color: 'white'
        }}>

            <img height={'150'} width='100%' src={posterUrl} alt={title} />


            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="white">
                    {new Date(releaseDate).toDateString()}
                </Typography>
            </CardContent>

            <CardActions>
                <Button sx={{
                    paddingX: "40px", margin: 'auto', bgcolor: '#900C3F', color: 'white', transition: 'all 0.2s ease',
                    borderRadius: '20px', ":hover": { bgcolor: '#900C3F', scale: '1.05' }
                }} size="small" LinkComponent={Link} to={`/booking/${id}`} >Book Now</Button>
            </CardActions>

        </Card >
    )
}

export default MovieItem