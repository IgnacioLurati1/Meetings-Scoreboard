import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';
import * as functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import cors from "cors";


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/scoreboard', scoreboardRouter);
app.use('/api/login', loginRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});