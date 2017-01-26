import mongoose, { Schema } from 'mongoose';

const User = mongoose.model('User', new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  notationTime: {type: String, uppercase:true, default:"UTC"},
  timeZone: Number,
  city: {type:String, uppercase: true},
  country: {type:String, uppercase: true}
}, {
  timestamps: true,
}));

export default User;
