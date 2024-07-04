import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true
    })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))

app.use("/api/users", userRoute);
app.use("/api/auth",authRoute);

//Response handler
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200, 201, 204].some((code) => code === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    })
})

//database connection 

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    } catch (error) {
        throw error;
    }
}

app.listen(8800, () => {
    connectMongoDB();
    console.log("server is running on 8800");
});

// using routes in here

