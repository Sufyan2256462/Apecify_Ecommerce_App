import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer','vendor','admin'], default: 'customer' },
  avatar: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String
}, { timestamps: true });
export default mongoose.model('User', schema);
