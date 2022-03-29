const Score = require('../models/scores.js');
const mongoose = require('mongoose');

const findScoreAndUpdate = (newPlayer) => {
  return Score.findOneAndUpdate({ email: newPlayer.email }, newPlayer, { upsert: true, new: true })
};

const getAllScores = () => {
  return Score.find()
}

module.exports = { findScoreAndUpdate, getAllScores }
