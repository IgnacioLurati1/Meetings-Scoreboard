import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';
import express from "express";


const app = express();

app.use((req, res, next) => {
  const allowedOrigin = "http://localhost:5173";
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
  }

  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});


app.use(express.json());

app.use('/api/scoreboard', scoreboardRouter);
app.use('/api/login', loginRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});