import { createError } from "../utils/error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const login = async(req,res,next) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return next(createError(404,"User not found"));
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            return next(createError(400,"Invalid Password"));
        }
        const token = jwt.sign(
            { id: user._id,  username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );


        res.status(200).json({
            message: "User logged in successfully",
            data: user,
            token : token,
        });
    } catch(error){
        return next(createError(500,"Something went wrong"));
    }
}