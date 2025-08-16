import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; //Del header, nos quedamos con el authorization: Bearer, el ? pregunta si existe, de lo contrario undefined y el split separa el bearer del token y nos quedamos con este ultimo
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send('Token inválido');
    }
}