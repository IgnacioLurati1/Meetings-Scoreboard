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
  'http://localhost:5137',
  'https://meetings-scoreboard-p6mjgu41m-ignaciolurati1s-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // permitir requests sin Origin (p. ej. health checks o server-side)
    if (!origin) return callback(null, true);

    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    // no lanzar Error: devolver false para que CORS no autorice la cabecera,
    // pero sin romper el servidor
    return callback(null, false);
  },
  exposedHeaders: ['Authorization'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
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