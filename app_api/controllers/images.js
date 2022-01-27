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
    {
      uri: req.body.uri,
      thumburi: req.body.thumburi,
      placeholderuri: req.body.placeholderuri,
      title: req.body.title,
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

const updateImage = async (req, res) => {
  try {
    const session = await mongoose.connection.startSession();
    await session.withTransaction(async () => {
      const imgDoc = await imgModel.findOne({_id: req.params.imageid}).session(session);
      if (imgDoc === null) {
        return res.status(404).json({message: "image missing"});
      }
      imgDoc.uri = req.body.uri;
      imgDoc.thumburi = req.body.thumburi;
      imgDoc.placeholderuri = req.body.placeholderuri;
      await imgDoc.save();
      res.status(201).json(null);
    });
    session.endSession();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getAllImages,
  getOneImage,
  uploadImage,
  deleteImage,
  updateImage
};
