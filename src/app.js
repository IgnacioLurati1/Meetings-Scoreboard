import express from "express";
import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';
import cors from 'cors';

const app = express(); 

app.use((req, res, next) => {
  console.log('Method:', req.method, 'Path:', req.path, 'Origin:', req.headers.origin);
  next();
});

const whitelist = [
  'http://localhost:5173',
  'http://localhost:5173/',
  'https://meetings-scoreboard-p6mjgu41m-ignaciolurati1s-projects.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // permitir requests sin origin (health checks/server-side)
    if (!origin) return callback(null, true);
    // permitir cualquier origin devolviendo true
    return callback(null, true);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  exposedHeaders: ['Authorization']
};

// Aplica CORS globalmente (suficiente para manejar preflight)
app.use(cors(corsOptions));


app.use(express.json());

// Rutas
app.use('/api/scoreboard', scoreboardRouter);
app.use('/api/login', loginRouter);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});