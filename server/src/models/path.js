import mongoose, { Schema } from 'mongoose';

const milestoneSchema = new Schema({
  name: String,
  reference: { type: String, ref: 'Path' },
});

if (!milestoneSchema.options.toJSON) milestoneSchema.options.toJSON = {};
milestoneSchema.options.toJSON.transform = (doc, ret) => ({
  id: ret._id,
  name: ret.name,
});

const pathSchema = new Schema({
  url: { type: String, unique: true },
  name: String,
  description: String,
  milestones: [milestoneSchema],
  username: { type: String, ref: 'User' },
}, {
  timestamps: true,
});

if (!pathSchema.options.toJSON) pathSchema.options.toJSON = {};
pathSchema.options.toJSON.transform = (doc, ret) => ({
  url: ret.url,
  name: ret.name,
  description: ret.description,
  user: ret.user,
  milestones: ret.milestones,
});

const Path = mongoose.model('Path', pathSchema);

export default Path;
