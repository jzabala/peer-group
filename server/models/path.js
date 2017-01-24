import mongoose, { Schema } from 'mongoose';

const item = new Schema({
  name: String,
  reference: { type: Schema.Types.ObjectId, ref: 'Path' },
});

const Path = mongoose.model('Path', new Schema({
  name: String,
  urlName: { type: String, unique: true },
  items: [item],
  user: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true,
}));

export default Path;
