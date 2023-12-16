const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager'], default: 'employee' },
});

module.exports = mongoose.model('User', userSchema);
userSchema.index({ username: 1 }, { unique: true });