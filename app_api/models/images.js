const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  timestamp: { type: Date, 'default': Date.now },
  text: String
});

const imageSchema = new mongoose.Schema({
  uri: { type: String, required: true},
  timestamp: { type: Date, 'default': Date.now },
  //tags: [String],
  comments: [commentSchema]
});

mongoose.model('Image', imageSchema);
