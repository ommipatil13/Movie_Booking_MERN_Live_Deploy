import Express from "express";
import { addAdmin, adminLogin, getAdminById, getAdmins } from "../controllers/admin_controllers.js";

const adminRouter = Express.Router();

adminRouter.post('/signup', addAdmin);
adminRouter.post('/login', adminLogin);
adminRouter.get('/', getAdmins);
adminRouter.get("/:id", getAdminById);

export default adminRouter;