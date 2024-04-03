import express, {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const router = express.Router();
const healthcheck = (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.NO_CONTENT);
};

router.get('/', healthcheck);

export default router;