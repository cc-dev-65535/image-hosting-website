const mongoose = require('mongoose');
const imgModel = mongoose.model('Image');

const getImageComments = (req, res) => {
  //console.log(req.params.imagepath);
  imgModel.find({uri: req.params.imagepath}).select('comments').exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    console.log(image);
    /*
    if (!image[0].comments.length) {
      return res.status(404).json({message: "no comments"});
    }
    */
    res.status(200).json(image);
  });
};

const postComment = (req, res) => {
  imgModel.find({uri: req.params.imagepath}).select('comments').exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!image) {
      return res.status(404).json({message: "image missing"});
    }
    addComment(req, res. image);
  });
};

const addComment = (req, res, image) => {
  image.comments.push({
    author: req.body.author,
    text: req.body.text
  });

  image.save((err, image) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let comment = image.comments[image.comments.length - 1];
      res.status(201).json(comment);
    }
  });
}

module.exports = {
  getImageComments,
  postComment
};
