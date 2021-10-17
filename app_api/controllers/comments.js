const mongoose = require('mongoose');
const imgModel = mongoose.model('Image');

const getImageComments = (req, res) => {
  imgModel.find({_id: req.params.imageid}).select('comments').exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }

    res.status(200).json(image);
  });
};

const postComment = (req, res) => {
  imgModel.find({_id: req.params.imageid}).select('comments').exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!image) {
      return res.status(404).json({message: "image missing"});
    }
    addComment(req, res, image);
  });
};

const addComment = async (req, res, image) => {
  const comment = {
    author: req.body.author,
    text: req.body.text
  }
  image[0].comments.push(comment);

  image[0].save((err, image) => {
    if (err) {
      res.status(400).json(err);
    }
    let comment = image.comments[image.comments.length - 1];
    res.status(201).json(comment);
  });
}

module.exports = {
  getImageComments,
  postComment
};
