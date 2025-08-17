import express from "express";
import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';

const app = express();

// CORS configurado solo para localhost
app.use((req, res, next) => {
  const allowedOrigin = "https://vercel.com/ignaciolurati1s-projects/meetings-scoreboard/3Pq6sHMSq8hSZCXExQr5tAjwDce8"; // tu frontend desplegado
  const origin = req.headers.origin;

  if (origin === allowedOrigin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true"); // si usás cookies o auth
  }

  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/scoreboard', scoreboardRouter);
app.use('/api/login', loginRouter);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});