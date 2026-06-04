import cors from 'cors'
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, //important when using cookies or auth tokens
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())

import userRouter from "./routes/user.route.js";
import websiteRouter from "./routes/website.route.js";
import paymentRouter from "./routes/payment.route.js";


app.use("/api/v1/user", userRouter);
app.use("/api/v1/website", websiteRouter);
app.use("/api/v1/payment", paymentRouter);

export { app }