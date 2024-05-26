import Express from "express";
import { deleteBookingById, getBookingById, newBooking } from "../controllers/booking_controller.js";

const bookingRouter = Express.Router();

bookingRouter.post('/', newBooking)
bookingRouter.get('/:id', getBookingById)
bookingRouter.delete('/:id', deleteBookingById)



export default bookingRouter;