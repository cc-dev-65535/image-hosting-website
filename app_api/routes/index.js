const express = require('express');
const router = express.Router();
const ctrlImages = require('../controllers/images');
const ctrlComments = require('../controllers/comments');

// Images
router.get('/images', ctrlImages.getAllImages);
router.get('/images/:imagepath', ctrlImages.getOneImage);
router.post('/images', ctrlImages.uploadImage)
router.delete('/images/:imagepath', ctrlImages.deleteImage);

// Comments
router.get('/comments/:imagepath', ctrlComments.getImageComments);
router.post('/comments/:imagepath', ctrlComments.postComment);

module.exports = router;
