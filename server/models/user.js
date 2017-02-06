import mongoose, { Schema } from 'mongoose';

const User = mongoose.model('User', new Schema({
  id: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: String,
}, {
  timestamps: true,
}));

export default User;
