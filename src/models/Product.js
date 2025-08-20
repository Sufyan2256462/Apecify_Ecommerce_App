import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [String],
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Product', schema);
