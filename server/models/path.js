import mongoose, { Schema } from 'mongoose';

const milestoneSchema = new Schema({
  name: String,
  reference: { type: Schema.Types.ObjectId, ref: 'Path' },
});

if (!milestoneSchema.options.toJSON) milestoneSchema.options.toJSON = {};
milestoneSchema.options.toJSON.transform = (doc, ret) => ({
  id: ret._id,
  name: ret.name,
});

const pathSchema = new Schema({
  name: String,
  url: { type: String, unique: true },
  description: String,
  milestones: [milestoneSchema],
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
  milestones: ret.milestones,
});

const Path = mongoose.model('Path', pathSchema);

export default Path;
