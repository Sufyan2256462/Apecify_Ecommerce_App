import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';
const r = express.Router();

r.get('/:productId', async (req,res)=>{
  const list = await Review.find({ product: req.params.productId }).populate('user','name');
  res.json(list);
});

r.post('/:productId', auth, async (req,res)=>{
  const { rating, comment } = req.body;
  const rev = await Review.create({ product: req.params.productId, user: req.user.id, rating, comment });
  const stats = await Review.aggregate([
    { $match: { product: rev.product } },
    { $group: { _id:'$product', avg: { $avg:'$rating' }, count: { $sum:1 } } }
  ]);
  const s = stats[0] || { avg: 0, count: 0 };
  await Product.findByIdAndUpdate(rev.product, { averageRating: s.avg, reviewsCount: s.count });
  res.status(201).json(rev);
});

export default r;
