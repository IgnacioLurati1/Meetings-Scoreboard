import express from "express";
import cors from "cors";
import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';

const app = express();

// CORS configurado solo para localhost
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === "http://localhost:5173") {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

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