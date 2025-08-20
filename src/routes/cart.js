import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';
const r = express.Router();

r.get('/', auth, async (req,res)=>{
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart || { user: req.user.id, items: [] });
});

r.post('/add', auth, async (req,res)=>{
  const { productId, qty=1 } = req.body;
  const p = await Product.findById(productId);
  if(!p) return res.status(404).json({message:'Product not found'});
  let cart = await Cart.findOne({ user: req.user.id });
  if(!cart) cart = await Cart.create({ user: req.user.id, items: [] });
  const i = cart.items.findIndex(x=> String(x.product)===String(productId));
  if(i>-1) cart.items[i].qty += qty; else cart.items.push({ product: productId, qty, price: p.price });
  await cart.save(); res.json(cart);
});

r.post('/remove', auth, async (req,res)=>{
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  if(!cart) return res.json({ user: req.user.id, items: [] });
  cart.items = cart.items.filter(i=> String(i.product)!==String(productId));
  await cart.save(); res.json(cart);
});

r.post('/clear', auth, async (req,res)=>{
  const cart = await Cart.findOne({ user: req.user.id });
  if(cart){ cart.items=[]; await cart.save(); }
  res.json(cart || { user: req.user.id, items: [] });
});

export default r;
