import mongoose, { Schema } from 'mongoose';

const User = mongoose.model('User', new Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: String,
  timeZone: String,
  city: { type: String, uppercase: true },
  country: { type: String, uppercase: true },
  lat: String,
  lng: String
}, {
  timestamps: true,
}));

export default User;
