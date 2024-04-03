import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {JWT_SECRET} from '../settings';
import {InvalidTokenException, UnauthorizedException} from "../errors/userException";
import {UserTokenPayload} from "../controllers/users";

declare module 'express-serve-static-core' {
    interface Request {
        user: UserTokenPayload;
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['access-token'];
    if (!token) throw new InvalidTokenException();
    const secret = JWT_SECRET;
    if (!secret) throw new UnauthorizedException();

    req.user = jwt.verify(token, secret, {ignoreExpiration: false}) as UserTokenPayload;
    next();
}