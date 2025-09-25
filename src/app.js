import express from "express";
import scoreboardRouter from './routers/scoreboardRouter.js';
import loginRouter from './routers/loginRouter.js';
import cors from 'cors';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scoreboard API",
      version: "1.0.0",
      description: "API documentation for Scoreboard endpoints",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routers/*.js"], // IMPORTANTE: es desde la raíz del proyecto
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Endpoint para ver la UI de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  console.log('Method:', req.method, 'Path:', req.path, 'Origin:', req.headers.origin);
  next();
}); // Ignoren esto, es solo para debuggear

// Configuración de CORS

const whitelist = [
  'https://meetings-scoreboard.vercel.app', 'https://meetings-scoreboard-git-prodfrontend-ignaciolurati1s-projects.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // permitir requests sin origin (health checks/server-side), en nuestro caso Swagger
    if (!origin) return callback(null, true);

    const allowed = whitelist.includes(origin);
    return callback(null, allowed);
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