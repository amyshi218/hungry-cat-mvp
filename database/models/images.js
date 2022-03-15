const mongoose = require('mongoose');

const imagesSchema = mongoose.Schema({
  greycat: String,
  whitecat: String,
  orangecat: String,
  chicken: String,
  cheese: String,
  fish: String,
  can: String,
  bone: String
})

const Images = mongoose.model('Images', imagesSchema);

module.exports = Images;