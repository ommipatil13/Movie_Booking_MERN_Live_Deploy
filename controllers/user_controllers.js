import Bookings from '../models/Bookings.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        // return next(error);
        return console.log(error);

    }

    if (!users) {
        return res.status(500).json({ message: 'Unexpected Error Occured' });
    }

    //   return res.status(200).json({ users: users }); but in es6 we dont need to write
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name && name.trim() === '' && !email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({ message: 'Invalid Inputs' });
    }

    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save();
    } catch (error) {
        // return next(error);
        return console.log(error);
    }

    if (!user) {
        return res.status(500).json({ message: 'Unexpected Error Occured' });
    }

    return res.status(201).json({ id: user._id })
};

export const updateUser = async (req, res, next) => {
    const id = req.params.id;

    const { name, email, password } = req.body;

    if (!name && name.trim() === '' && !email && email.trim() === '') {
        return res.status(422).json({ message: 'Invalid Inputs' });
    }

    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });

    } catch (error) {
        return console.log(error)
    }

    if (!user) {
        return res.status(500).json({ message: "something went wrong" })
    }
    res.status(200).json({ message: "Updated Successfully" });

}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id)
    } catch (error) {
        return console.log(error)
    }

    if (!user) {
        return res.status(500).json({ message: "something went wrong" })
    }
    res.status(200).json({ message: "Deleted Successfully" });

}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({ message: 'Invalid Inputs' });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "unable to find user" })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "password incorrect" })
    }

    return res.status(200).json({ message: "login successfull", id: existingUser._id })
}

export const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Bookings.find({ user: id })
            .populate("movie")
            .populate("user");
    } catch (error) {
        return console.log(error)
    }

    if (!bookings) {
        return res.status(500).json({ message: "Unable to fetch bookings" })
    }

    return res.status(200).json({ bookings })
}

export const getUserById = async (req, res, next) => {
    const id = req.params.id
    let user;
    try {
        user = await User.findById(id);
    } catch (error) {
        // return next(error);
        return console.log(error);

    }

    if (!user) {
        return res.status(500).json({ message: 'Unexpected Error Occured' });
    }

    //   return res.status(200).json({ users: users }); but in es6 we dont need to write
    return res.status(200).json({ user });
};