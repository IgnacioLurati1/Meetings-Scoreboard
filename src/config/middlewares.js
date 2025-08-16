import {auth as auth} from './firebase.js';

export async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; //Del header, nos quedamos con el authorization: Bearer, el ? pregunta si existe, de lo contrario undefined y el split separa el bearer del token y nos quedamos con este ultimo
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).send('Forbidden');
    }
}