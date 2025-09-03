import express from 'express';
import cookieParser from 'cookie-parser';
import indexRoutes from "./routes/index.route.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api", indexRoutes);