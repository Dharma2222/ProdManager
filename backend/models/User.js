import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true }, // already hashed
  role: { type: String, enum: ['user','admin'], default: 'user' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
