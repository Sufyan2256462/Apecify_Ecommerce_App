import express from 'express';
import { auth, role } from '../middleware/auth.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
const r = express.Router();

r.use(auth, role(['admin']));

r.get('/stats', async (req,res)=>{
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  res.json({ users, products, orders });
});

r.get('/orders', async (req,res)=>{
  const list = await Order.find().sort({ createdAt:-1 });
  res.json(list);
});

r.put('/orders/:id/status', async (req,res)=>{
  const up = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new:true });
  res.json(up);
});

export default r;
