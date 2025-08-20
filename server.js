import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './src/routes/auth.js';
import productRoutes from './src/routes/products.js';
import reviewRoutes from './src/routes/reviews.js';
import cartRoutes from './src/routes/cart.js';
import orderRoutes from './src/routes/orders.js';
import adminRoutes from './src/routes/admin.js';
import vendorRoutes from './src/routes/vendors.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendors', vendorRoutes);

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
