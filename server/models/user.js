import mongoose, { Schema } from 'mongoose';

export default mongoose.model('users', new Schema({
  email: String,
  password: String,
}, {
  timestamps: true,
}));
