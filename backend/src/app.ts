import express from 'express';
import "express-async-errors";
import cors from 'cors';
import cookieParser from "cookie-parser";
import {CORS_ALLOWED_ORIGIN} from "./settings";
import users from './routes/users';
import notes from "./routes/notes";
import healthcheck from "./routes/healthcheck";
import exceptionHandler from "./middlewares/exceptionHandler";

const app = express();

app.use(
    cors({
        origin: CORS_ALLOWED_ORIGIN,
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exceptionHandler);

// Add router
app.use('/api', users);
app.use('/api/notes', notes);
app.use('/api/healthcheck', healthcheck);

export {app};