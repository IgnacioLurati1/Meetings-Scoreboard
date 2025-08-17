import express from "express";
import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';
import cors from 'cors';

const app = express(); 

const whitelist = ['http://localhost:5137', 'https://meetings-scoreboard-p6mjgu41m-ignaciolurati1s-projects.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por CORS'));
    }
  },
  exposedHeaders: 'Authorization',
};

// Aplica la configuración de CORS a toda la aplicación
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