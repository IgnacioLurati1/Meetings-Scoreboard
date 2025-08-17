import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';
import * as functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import cors from "cors";


const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["*"]
}));


app.use(express.json());

app.use('/api/scoreboard', scoreboardRouter);
app.use('/api/login', loginRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});