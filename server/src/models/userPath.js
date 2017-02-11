import mongoose, { Schema } from 'mongoose';

const userMilestone = new Schema({
  milestoneId: Schema.Types.ObjectId,
  percentage: Number,
});

if (!userMilestone.options.toJSON) userMilestone.options.toJSON = {};
userMilestone.options.toJSON.transform = (doc, ret) => ({
  milestoneId: ret.milestoneId,
  percentage: ret.percentage,
});

const history = new Schema({
  milestoneId: Schema.Types.ObjectId,
  percentage: Number,
  createdAt: Date,
});

history.pre('save', function createAt(next) {
  if (!this.createAt) {
    this.createdAt = new Date();
  }
  next();
});

const userPath = new Schema({
  username: { type: String, ref: 'User' },
  pathUrl: { type: String, ref: 'Path' },
  milestones: [userMilestone],
  history: [history],
}, {
  timestamps: true,
});

if (!userPath.options.toJSON) userPath.options.toJSON = {};
userPath.options.toJSON.transform = (doc, ret) => ({
  username: ret.username,
  pathUrl: ret.pathUrl,
  milestones: ret.milestones,
});

export default mongoose.model('UserPath', userPath);
