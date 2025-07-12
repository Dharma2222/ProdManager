// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


dotenv.config();
const app = express();

// CORS: restrict origins to frontend app
app.use(cors({ 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

connectDB();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProdManager API',
      version: '1.0.0',
      description: 'CRUD API for product management with JWT auth and RBAC',
    },
    servers: [
      { url: process.env.VITE_API_URL }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js', './models/*.js'],
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Public auth endpoints
app.use('/api/auth', authRoutes);

// Protected product endpoints
app.use('/api/products', productRoutes);

// health check
app.get('/', (_, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
