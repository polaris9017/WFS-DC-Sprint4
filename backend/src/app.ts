import express, {NextFunction, Request, Response} from 'express';
import "express-async-errors";
import cors from 'cors';
import {StatusCodes} from 'http-status-codes';
import {CORS_ALLOWED_ORIGIN} from "./settings";
import users from './routes/users';
import notes from "./routes/notes";
import healthcheck from "./routes/healthcheck";
import {InternalServerException} from "./errors/userException";

const app = express();

app.use(
    cors({
        origin: CORS_ALLOWED_ORIGIN,
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong!');
    throw new InternalServerException();
});

// Add router
app.use('/api', users);
app.use('/api/notes', notes);
app.use('/api/healthcheck', healthcheck);

export {app};