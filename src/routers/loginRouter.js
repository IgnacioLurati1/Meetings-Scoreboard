import Router from 'express';
import {login, createUser} from '../controlers/loginController.js';
import {verifyToken as verifyToken} from '../config/middlewares.js'

const router = Router();

router.post('/login', login);
router.post('/register', verifyToken, createUser);

export default router;
