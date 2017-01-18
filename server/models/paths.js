import mongoose, { Schema } from 'mongoose';

const route = new Schema({
  name: String,
  reference: { type: Schema.Types.ObjectId, ref: 'paths' },
});

const paths = mongoose.model('paths', new Schema({
  name: String,
  urlName: { type: String, unique: true },
  route: [route],
  user: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true,
}));

export default paths;
