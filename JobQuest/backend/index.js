import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import applicationRoute from "./routes/application.route.js"
import jobRoute from "./routes/job.route.js"
dotenv.config({});


const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

// Use cookieParser after CORS
app.use(cookieParser());

// Example route
app.get('/home', (req, res) => {
    return res.status(200).json({
        message : "I am coming from backend",
        success : true
    });
});

// Start the server
const PORT =    3000 || process.env.PORT ;


//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);




app.listen(PORT, (err) => {
    if (err) {
        
        console.error('Error starting server:', err);
    } else {
        connectDB();
        console.log(`Server is running on port ${PORT}`);
    }
});
