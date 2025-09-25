import Router from 'express';
import {login, createUser} from '../controlers/loginController.js';
import {verifyToken as verifyToken} from '../config/middlewares.js'

const router = Router();

/**
 * @openapi
 * /api/login/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with email and password and returns a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials (wrong email or password).
 *       500:
 *         description: Server error.
 */
router.post('/login', login);

router.post('/register', verifyToken, createUser);

export default router;
