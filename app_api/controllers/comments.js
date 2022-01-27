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

const postComment = async (req, res) => {
  try {
    const session = await mongoose.connection.startSession();
    await session.withTransaction(async () => {
      const imgDoc = await imgModel.findOne({_id: req.params.imageid}).session(session);
      if (imgDoc === null) {
        return res.status(404).json({message: "image missing"});
      }
      const comment = {
        author: req.body.author,
        text: req.body.text
      }
      imgDoc.comments.push(comment);
      await imgDoc.save();
      const currComment = imgDoc.comments[imgDoc.comments.length - 1];
      res.status(201).json(currComment);
    });
    session.endSession();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getImageComments,
  postComment
};
