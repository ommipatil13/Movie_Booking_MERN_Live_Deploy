import Express from "express";
import { addMovie, getAllMovies, getMovieById } from "../controllers/movie_controller.js";

const movieRouter = Express.Router();

movieRouter.get('/', getAllMovies)
movieRouter.get('/:id', getMovieById)
movieRouter.post('/', addMovie)

export default movieRouter;