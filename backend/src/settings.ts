import dotenv from 'dotenv';

dotenv.config();
export const PORT = process.env.PORT || 3031;
export const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || "";
export const JWT_SECRET = process.env.JWT_SECRET
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS!);
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '30m';
export const NODE_ENV = process.env.NODE_ENV || 'development';