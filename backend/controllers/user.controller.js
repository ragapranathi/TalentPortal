import { createError } from "../utils/error.js";
import User from "../models/User.js";
import { createSuccess } from "../utils/success.js";
import bcrypt from "bcryptjs"

export const createUser = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const newUser = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        const message = "User Created!";
        return next(createSuccess(200,message));
    } catch (error) {
        return next(createError(500, "Something went wrong"))
    }
}