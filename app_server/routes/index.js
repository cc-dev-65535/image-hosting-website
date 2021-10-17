var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/main');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const tempArray = file.originalname.split(".");
    const fileType = tempArray[tempArray.length - 1];
    cb(null, timestamp + "." + fileType);
  }
})
const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', ctrl.homepage);
router.get('/image/:imageid', ctrl.getImage);
router.post('/upload', upload.single('image'), ctrl.upload);
router.post('/comment/:imageid', ctrl.postComment);

module.exports = router;
