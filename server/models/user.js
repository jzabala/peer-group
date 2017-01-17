import mongoose, { Schema } from 'mongoose';

export default mongoose.model('users', new Schema({
  email: { type: String, index: { unique: true } },
  password: String,
}, {
  timestamps: true,
}));
