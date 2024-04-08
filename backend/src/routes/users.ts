import express from 'express';
import {signIn, signUp, signOut, getUserDetail} from '../controllers/users';
import {authenticateUser} from "../middlewares/authentication";

const router = express.Router();

router.post('/login', authenticateUser, signIn);
router.post('/users', authenticateUser, signUp);
router.get('/users/me', authenticateUser, authenticateUser, getUserDetail);
router.post('/logout', authenticateUser, signOut);

export default router;