import mongoose, { Schema } from 'mongoose';

const users = mongoose.model('users', new Schema({
  email: { type: String, unique: true },
  password: String,
}, {
  timestamps: true,
}));

export default users;
