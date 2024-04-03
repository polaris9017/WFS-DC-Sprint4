import express from 'express';
import {signIn, signUp, signOut, getUserDetail} from '../controllers/users';
import {authenticateUser} from "../middlewares/authentication";

const router = express.Router();

router.post('/login', signIn);
router.post('/users', signUp);
router.get('/users/me',authenticateUser, getUserDetail);
router.post('/logout', signOut);

export default router;