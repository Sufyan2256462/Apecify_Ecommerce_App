import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    qty: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, enum: ['pending','paid','shipped','delivered','cancelled'], default: 'paid' },
  address: String
}, { timestamps: true });
export default mongoose.model('Order', schema);
