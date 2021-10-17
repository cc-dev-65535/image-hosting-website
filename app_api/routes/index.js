const express = require('express');
const router = express.Router();
const ctrlImages = require('../controllers/images');
const ctrlComments = require('../controllers/comments');

// Images
router.get('/images', ctrlImages.getAllImages);
router.get('/images/:imageid', ctrlImages.getOneImage);
router.post('/images', ctrlImages.uploadImage)
router.delete('/images/:imageid', ctrlImages.deleteImage);

// Comments
router.get('/comments/:imageid', ctrlComments.getImageComments);
router.post('/comments/:imageid', ctrlComments.postComment);

module.exports = router;
