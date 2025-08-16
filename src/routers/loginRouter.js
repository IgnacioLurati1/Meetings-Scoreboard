import Router from 'express';
import {login, createUser} from '../controlers/loginController.js';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);

export default router;
