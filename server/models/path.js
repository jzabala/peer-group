import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
  name: String,
  reference: { type: Schema.Types.ObjectId, ref: 'Path' },
});

if (!itemSchema.options.toJSON) itemSchema.options.toJSON = {};
itemSchema.options.toJSON.transform = (doc, ret) => ({
  id: ret._id,
  name: ret.name,
});

const pathSchema = new Schema({
  name: String,
  url: { type: String, unique: true },
  description: String,
  items: [itemSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

if (!pathSchema.options.toJSON) pathSchema.options.toJSON = {};
pathSchema.options.toJSON.transform = (doc, ret) => ({
  id: ret._id,
  name: ret.name,
  description: ret.description,
  url: ret.url,
  user: ret.user,
  items: ret.items,
});

const Path = mongoose.model('Path', pathSchema);

export default Path;
