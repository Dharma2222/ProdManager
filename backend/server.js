// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB }      from './config/db.js';
import productRoutes      from './routes/productRoutes.js';
import authRoutes         from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB("mongodb+srv://kevadiyadharma:qnspL72jVPb0ljy9@prodmanager.av37pd6.mongodb.net/?retryWrites=true&w=majority&appName=ProdManager");

// Public auth endpoints
app.use('/api/auth', authRoutes);

// Protected product endpoints
app.use('/api/products', productRoutes);

// health check
app.get('/', (_, res) => res.send('API is running'));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
