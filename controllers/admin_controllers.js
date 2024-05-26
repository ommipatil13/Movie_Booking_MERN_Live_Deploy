import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const addAdmin = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });

    } catch (error) {
        return console.log(error)
    }

    if (existingAdmin) {
        return res.status(400).json({ message: 'admin already exist' });
    }

    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({ email, password: hashedPassword });
        admin = await admin.save();
    } catch (error) {
        return console.log(error)
    }

    if (!admin) {
        return res.status(500).json({ message: 'Unexpected to store admin' });
    }
    return res.status(201).json({ admin })

}

export const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (!existingAdmin) {
        return res.status(400).json({ message: "Admin not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Password" })
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: "7d" })

    return res.status(200).json({ message: "Authentication complete", token, id: existingAdmin._id })
}

export const getAdmins = async (req, res, next) => {
    let admins;
    try {

        admins = await Admin.find()

    } catch (error) {
        return console.log(error)
    }

    if (!admins) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    return res.status(200).json({ admins })
}

export const getAdminById = async (req, res, next) => {
    const id = req.params.id;

    let admin;
    try {
        admin = await Admin.findById(id).populate("addedMovies");
    } catch (err) {
        return console.log(err);
    }
    if (!admin) {
        return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin });
};