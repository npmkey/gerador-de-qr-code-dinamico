const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Link', LinkSchema);
