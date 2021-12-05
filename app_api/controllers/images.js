const mongoose = require('mongoose');
const imgModel = mongoose.model('Image');

const getAllImages = (req, res) => {
  imgModel.find().sort({ timestamp: 'desc' }).exec((err, images) => {
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
  imgModel.find({_id: req.params.imageid}).exec((err, image) => {
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
  imgModel.create(
    { uri: req.body.uri,
      thumburi: req.body.thumburi,
      placeholderuri: req.body.placeholderuri,
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
  imgModel.deleteOne({_id: req.params.imageid}).exec((err) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(204).json(null);
  });
};

const updateImage = (req, res) => {
  imgModel.find({_id: req.params.imageid}).exec((err, image) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!image) {
      return res.status(404).json({message: "image missing"});
    }
    image[0].uri = req.body.uri;
    image[0].thumburi = req.body.thumburi;
    image[0].placeholderuri = req.body.placeholderuri;

    image[0].save((err, image) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(201).json(null);
    });
  });
};

module.exports = {
  getAllImages,
  getOneImage,
  uploadImage,
  deleteImage,
  updateImage
};
