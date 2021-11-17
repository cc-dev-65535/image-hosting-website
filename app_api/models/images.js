const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  timestamp: { type: Date, 'default': Date.now },
  text: String
});

const imageSchema = new mongoose.Schema({
  uri: { type: String, required: true },
  thumburi: { type: String, required: true },
  placeholderuri: { type: String, required: true },
  timestamp: { type: Date, 'default': Date.now },
  comments: [commentSchema]
});

mongoose.model('Image', imageSchema);
