import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const hackerStatsSchema = new mongoose.Schema({
  username: String,
  school: String,
  techStack: String,
  desiredRole: String,
  contact: String,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hackerStats: hackerStatsSchema
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);
