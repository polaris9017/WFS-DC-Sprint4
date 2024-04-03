import {NextFunction, Request, Response} from 'express';
import User from "../models/user";
import {SignUpFailedException} from "../errors/userException";
import {StatusCodes} from "http-status-codes";
import {DatabaseException} from "../errors/baseException";
import {NODE_ENV} from '../settings';

export interface UserTokenPayload {
    id: number;
    email: string;
}

// API: POST /login
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    let token: string;
    try {
        token = await User.signIn(email, password);
    } catch (err) {
        throw new SignUpFailedException();
    }

    res.cookie('access-token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        secure: NODE_ENV === 'production'
    });

    res.status(StatusCodes.NO_CONTENT);  // 정상적으로 로그인이 되었을 때
};

// API: POST /users
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    try {
        await User.signUp(email, password);
    } catch (err) {
        if (err instanceof DatabaseException && err.code === 'ER_DUP_ENTRY') {
            res.status(StatusCodes.CONFLICT).send('User already exists.');
        }
        throw new SignUpFailedException();
    }

    res.status(StatusCodes.CREATED);
};

// API: POST /logout
export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('access-token');
    res.status(StatusCodes.OK);
};

// API: GET /users/me
export const getUserDetail = async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({email: req.user.email});
};