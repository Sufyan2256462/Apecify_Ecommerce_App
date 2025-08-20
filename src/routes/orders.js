import express from 'express';
import { auth } from '../middleware/auth.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import { sendMail } from '../services/mailer.js';
const r = express.Router();

r.get('/', auth, async (req,res)=>{
  const list = await Order.find({ user: req.user.id }).sort({ createdAt:-1 });
  res.json(list);
});

r.post('/checkout', auth, async (req,res)=>{
  const { address } = req.body;
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if(!cart || cart.items.length===0) return res.status(400).json({message:'Cart is empty'});
  const items = cart.items.map(i=>({ product: i.product._id, vendor: i.product.vendor, qty: i.qty, price: i.price }));
  const total = items.reduce((s,i)=> s + i.price*i.qty, 0);
  const order = await Order.create({ user: req.user.id, items, total, address, status:'paid' });
  await cart.deleteOne();
  
  // Send enhanced email notification
  try {
    const emailSubject = `Order Confirmation - Order #${order._id.toString().slice(-6)}`;
    const emailText = `
Thank you for your order!

Order Details:
- Order ID: ${order._id}
- Total Amount: $${total.toFixed(2)}
- Items: ${items.length} item(s)
- Status: ${order.status}

Your order has been received and is being processed. You will receive updates as your order progresses.

Best regards,
Apexcify Shop Team
    `;
    
    await sendMail(req.user.email, emailSubject, emailText);
    console.log('Order confirmation email sent to:', req.user.email);
  } catch (error) {
    console.error('Failed to send order email:', error);
  }
  
  res.status(201).json(order);
});

r.get('/track/:id', auth, async (req,res)=>{
  const ord = await Order.findById(req.params.id);
  if(!ord) return res.status(404).json({message:'Not found'});
  if(String(ord.user)!==req.user.id) return res.status(403).json({message:'Forbidden'});
  res.json({ status: ord.status, updatedAt: ord.updatedAt });
});

export default r;
