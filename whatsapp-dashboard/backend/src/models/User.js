// backend/src/models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['admin','moderator','viewer'], default: 'viewer' },
  approved: { type: Boolean, default: false } // ob der Account freigeschaltet ist
});
module.exports = mongoose.model('User', UserSchema);
