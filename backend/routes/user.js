import express from "express"
import { createUser } from "../controllers/user.controller.js" //Dont forget .js

const router = express.Router();
//sign up page 
router.post("/", createUser);


export default router;