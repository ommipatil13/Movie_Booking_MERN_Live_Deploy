import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';


const Carousell = () => {

    const items = [
        {
            image: "https://sm.ign.com/ign_in/news/n/new-loki-p/new-loki-poster-shows-off-the-series-characters-including-a_1q1v.jpg",
            alt: 'loki'
        },
        {
            image: "https://christinescinemacorner.files.wordpress.com/2020/09/itsokaytonotbeokay-poster.png?w=640",
            alt: 'itsoktonottobeok'
        },
        {
            image: "https://m.media-amazon.com/images/I/61OI-l62wCL._AC_UF894,1000_QL80_.jpg",
            alt: 'residentevil'
        },

    ];

    return (
        <>
            <Carousel sx={{ borderRadius: '40px', height: '50vh' }} >
                {items.map((item) => (
                    <Paper  >
                        <img width={"100%"} height={"100%"} src={item.image} alt={item.alt} />
                    </Paper>
                ))}
            </Carousel>
        </>
    )
}

export default Carousell