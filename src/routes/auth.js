import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { sendMail } from '../services/mailer.js';
import crypto from 'crypto';
const r = express.Router();

r.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({min:6}),
  body('role').optional().isIn(['customer','vendor'])
], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  const { name, email, password, role='customer' } = req.body;
  const exists = await User.findOne({ email });
  if(exists) return res.status(409).json({message:'Email exists'});
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = await User.create({ name, email, role, passwordHash: await bcrypt.hash(password,10), verificationToken });

  const verificationLink = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${verificationToken}`;
  await sendMail(user.email, 'Verify Your Email', `Please click on this link to verify your email: ${verificationLink}`);

  res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
});

r.post('/login', [
  body('email').isEmail(), body('password').notEmpty()
], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({message:'Invalid credentials'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({message:'Invalid credentials'});
  if(!user.isVerified && user.role !== 'admin') return res.status(401).json({message:'Please verify your email to login.'});
  const token = jwt.sign({ id:user._id, role:user.role, email:user.email, name:user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  res.json({ token });
});

r.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired verification token.' });
  }

  user.isVerified = true;
  user.verificationToken = undefined; // Clear the token after verification
  await user.save();

  res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
});

export default r;
