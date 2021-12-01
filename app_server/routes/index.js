var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/main');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const tempArray = file.originalname.split(".");
    const fileType = tempArray[tempArray.length - 1];
    if (/jpg|png|webp/.test(fileType)) {
      cb(null, timestamp + "." + fileType);
    } else {
      cb(new Error("Invalid image file"));
    }
  }
})
const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', ctrl.homepage);
router.get('/image/:imageid', ctrl.getImage);
router.post('/upload', upload.single('image'), ctrl.upload);
router.post('/comment/:imageid', ctrl.postComment);

module.exports = router;
