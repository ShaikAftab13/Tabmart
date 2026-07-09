import express from 'express';
import { getCurrentUser, login, logout, register } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const authRouter = express.Router()

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get("/user", auth, getCurrentUser);

export default authRouter;