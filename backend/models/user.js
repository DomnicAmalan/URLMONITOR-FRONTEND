const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: { type: String, unique: true },
  }},
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

module.exports = mongoose.model('Users', UserSchema)