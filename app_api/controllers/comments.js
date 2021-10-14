const mongoose = require('mongoose');
const imgModel = mongoose.model('Image');

const getImageComments = (req, res) => {
  //console.log(req.params.imagepath);
  imgModel.find({uri: req.params.imagepath}).select('comments').exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    //console.log(image);
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
    addComment(req, res, image);
  });
};

const addComment = async (req, res, image) => {
  //console.log(image);
  const comment = {
    author: req.body.author,
    text: req.body.text
  }
  //console.log(comment);
  image[0].comments.push(comment);
  //console.log(image);
  //await image[0].save();
  //res.status(201).json(comment);
  image[0].save((err, image) => {
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
