import express from 'express';
import Product from '../models/Product.js';
import { auth, role } from '../middleware/auth.js';
const r = express.Router();

r.get('/', async (req,res)=>{
  const { q, tag } = req.query;
  const filter = {};
  if(q) filter.title = { $regex: q, $options: 'i' };
  if(tag) filter.tags = tag;
  const list = await Product.find(filter).populate('vendor','name');
  res.json(list);
});

r.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id).populate('vendor','name');
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
});

r.post('/', auth, role(['vendor','admin']), async (req,res)=>{
  const doc = await Product.create({ ...req.body, vendor: req.user.id });
  res.status(201).json(doc);
});

r.put('/:id', auth, role(['vendor','admin']), async (req,res)=>{
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({message:'Not found'});
  if(req.user.role!=='admin' && String(p.vendor)!==req.user.id) return res.status(403).json({message:'Forbidden'});
  Object.assign(p, req.body); await p.save(); res.json(p);
});

r.delete('/:id', auth, role(['vendor','admin']), async (req,res)=>{
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({message:'Not found'});
  if(req.user.role!=='admin' && String(p.vendor)!==req.user.id) return res.status(403).json({message:'Forbidden'});
  await p.deleteOne(); res.json({message:'Deleted'});
});

export default r;
