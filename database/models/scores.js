const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  name: String,
  email: String,
  score: Number
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;