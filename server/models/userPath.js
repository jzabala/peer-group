import mongoose, { Schema } from 'mongoose';

const userMilestone = new Schema({
  milestoneId: Schema.Types.ObjectId,
  status: String,
});

if (!userMilestone.options.toJSON) userMilestone.options.toJSON = {};
userMilestone.options.toJSON.transform = (doc, ret) => ({
  milestoneId: ret.milestoneId,
  status: ret.status,
});

const history = new Schema({
  milestoneId: Schema.Types.ObjectId,
  status: String,
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
  status: String,
  milestones: [userMilestone],
  history: [history],
}, {
  timestamps: true,
});

if (!userPath.options.toJSON) userPath.options.toJSON = {};
userPath.options.toJSON.transform = (doc, ret) => ({
  username: ret.user,
  pathUrl: ret.path,
  status: ret.status,
  milestones: ret.milestones,
});

export default mongoose.model('UserPath', userPath);
