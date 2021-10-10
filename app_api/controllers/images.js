const mongoose = require('mongoose');
const imgModel = mongoose.model('Image');

const getAllImages = (req, res) => {
  imgModel.find().exec((err, images) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!images.length) {
      return res.status(404).json({message: "no images"});
    }
    res.status(200).json(images);
  });
};

const getOneImage = (req, res) => {
  imgModel.find({uri: req.params.imagepath}).exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!image) {
      return res.status(404).json({message: "image missing"});
    }
    res.status(200).json(image);
  });
};

const uploadImage = (req, res) => {
  console.log(req.body.uri);
  imgModel.create(
    { uri: req.body.uri,
      //timestamp: new Date(),
      comments: []
    }, (err, image) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(image);
    }
  );
};

const deleteImage = (req, res) => {
  imgModel.find({uri: req.params.imagepath}).exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!image) {
      return res.status(404).json({message: "image missing"});
    }
    image.remove((err, image) => {
      res.status(204).json(null);
    });
  });
};

module.exports = {
  getAllImages,
  getOneImage,
  uploadImage,
  deleteImage
};
