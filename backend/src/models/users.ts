import bcrypt from 'bcrypt';
import {defaultConnection as connection} from "../utils/mysql";
import {SignInFailedException} from '../errors/userException';
import {JWT_SECRET, SALT_ROUNDS, TOKEN_EXPIRES_IN} from '../settings';
import {RowDataPacket} from "mysql2/promise";
import jwt from "jsonwebtoken";

interface User {
    id: number;
    email: string;
    encrypted_password: string;
}

const hashPassword = async (password: string) => bcrypt.hash(password, SALT_ROUNDS);
const comparePassword = async (password: string, hash: string) => bcrypt.compare(password, hash);

const signIn = async (email: string, password: string) => {
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user && await comparePassword(password, user.encrypted_password)) {
        const payload = {id: user.id, email: user.email};
        return jwt.sign(payload, JWT_SECRET!, {expiresIn: TOKEN_EXPIRES_IN});
    }

    throw new SignInFailedException();
};

const signUp = async (email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    let result: User;

    const [rows] = await connection.query('INSERT INTO users (email, encrypted_password) VALUES (?, ?)', [email, hashedPassword]);
    result = {
        id: rows.id,
        email: email,
        encrypted_password: hashedPassword
    } satisfies User;

    return result;
};

const User = {
    signIn,
    signUp
};

export default User;