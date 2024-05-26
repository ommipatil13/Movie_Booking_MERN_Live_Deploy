import Express from 'express';
import { deleteUser, getAllUsers, getBookingsOfUser, getUserById, login, signup, updateUser } from '../controllers/user_controllers.js';

const userRouter = Express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/signup', signup);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

//login
userRouter.post('/login', login)

//get bookings
userRouter.get('/bookings/:id', getBookingsOfUser)


export default userRouter;
