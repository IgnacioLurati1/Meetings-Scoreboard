import {db} from '../config/firebase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const snapshot = await db.collection('admins').where('email', '==', email).get();
        
        if (snapshot.empty) {
            return res.status(401).json({ error: 'Email inválido, media pila' });
        }

        const admin = snapshot.docs[0].data();
        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'La contraseña pertenece al usuario Juan, na mentira jajaja era re malo' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

async function createUser(req, res) {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('admins').add({ email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    createUser,
    login
}