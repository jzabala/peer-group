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
  id: { type: String, unique: true },
  name: String,
  description: String,
  milestones: [milestoneSchema],
  user: { type: String, ref: 'User' },
}, {
  timestamps: true,
});

if (!pathSchema.options.toJSON) pathSchema.options.toJSON = {};
pathSchema.options.toJSON.transform = (doc, ret) => ({
  id: ret.id,
  name: ret.name,
  description: ret.description,
  user: ret.user,
  milestones: ret.milestones,
});

const Path = mongoose.model('Path', pathSchema);

export default Path;
