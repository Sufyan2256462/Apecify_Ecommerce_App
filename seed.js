import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Product from './src/models/Product.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

await User.deleteMany({});
await Product.deleteMany({});

const admin = await User.create({ name:'Admin', email:'admin@shop.com', passwordHash: await bcrypt.hash('Admin123!',10), role:'admin', isVerified: true });
const vendor = await User.create({ name:'Vendor', email:'vendor@shop.com', passwordHash: await bcrypt.hash('Vendor123!',10), role:'vendor', isVerified: true });
const customer = await User.create({ name:'Customer', email:'customer@shop.com', passwordHash: await bcrypt.hash('Customer123!',10), role:'customer', isVerified: true });

const pics = [

  'https://images.unsplash.com/photo-1755389521304-51d55cec52d6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200',
  'https://unsplash.com/photos/a-tabby-cat-sits-with-one-paw-raised-ppC8AnHbKU0',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200',
  'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=1200',
  
  
];

const make = (title, price) => ({ title, description:`${title} by Apexcify`, price, stock:randomInt(20,100), images:[pics[Math.floor(Math.random()*pics.length)]], vendor: vendor._id, tags:['new','trending'] });
function randomInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

await Product.insertMany([
  make('Apexcify Hoodie', 49.99),
  make('Apexcify Sneakers', 89.00),
  make('Apexcify Cap', 19.50),
  make('Apexcify Tote', 24.00),
  make('Apexcify Jacket', 119.00),
]);

console.log('Seed complete:', { admin: admin.email, vendor: vendor.email, customer: customer.email });
await mongoose.disconnect();
