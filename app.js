import Express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user_routes from './routes/user_routes.js';
import admin_routes from './routes/admin_routes.js';
import movie_routes from './routes/movie_routes.js';
import booking_routes from './routes/booking_routes.js';
import payment_routes from './routes/payment_routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = Express();

app.use(cors());

//middleware
app.use(Express.json())
app.use('/user', user_routes);
app.use('/admin', admin_routes);
app.use('/movie', movie_routes);
app.use('/booking', booking_routes)
app.use('/payment', payment_routes)

mongoose
    .connect(
        `mongodb+srv://admin:cTX5XJqpNlIsgQx7@cluster0.mtqh778.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => app.listen(8080, () => console.log('server and database connected')))
    .catch((e) => console.log(e));



//deploy
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(Express.static(path.join(__dirname, "./client/build")))

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// app.use('/', (req, res, next) => {
//     res.send('hello');
// })

// app.listen(8080, () => {
//     console.log(`server is live ${8080}`)
// })
