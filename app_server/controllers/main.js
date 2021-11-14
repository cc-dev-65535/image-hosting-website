const createError = require('http-errors');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
const sharp = require('sharp');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const apiOptions = {
  server: 'http://localhost:3200'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://fathomless-wave-52759.herokuapp.com';
}
const imageserver = 'https://imagehostingproject.s3.ca-central-1.amazonaws.com';

const REGION = "ca-central-1";
const s3Client = new S3Client({ region: REGION });

const homepage = async (req, res, next) => {
  const path = '/api/images'
  const url = apiOptions.server + path;
  let response;
  try {
    response = await fetch(url);
  } catch(error) {
    console.log(error);
    return next(createError(500));
  }
  // CASE: No images to display
  if (response.status === 404) {
    return res.render('index', { title: 'Image Hosting Site', images: []});
  }
  if (response.status !== 200) {
    return next(createError(response.status));
  }
  const imageData = await response.json();
  imageData.reverse();
  res.render('index', { title: 'Image Hosting Site', images: imageData});
};

const getImage = async (req, res, next) => {
  const path = '/api/images/'
  const url = apiOptions.server + path + req.params.imageid;
  let response;
  try {
    response = await fetch(url);
  } catch(error) {
    console.log(error);
    return next(createError(500));
  }
  if (response.status !== 200) {
    return next(createError(response.status));
  }
  const imageData = await response.json();
  const uri = imageData[0].uri;
  const thumburi = imageData[0].thumburi;
  const imageID = imageData[0]._id;

  const pathtwo = '/api/comments/'
  const urltwo = apiOptions.server + pathtwo + req.params.imageid;
  let responsetwo;
  try {
    responsetwo = await fetch(url);
  } catch(error) {
    console.log(error);
    return next(createError(500));
  }
  if (responsetwo.status !== 200) {
    return next(createError(response.status));
  }
  const commentData = await responsetwo.json();
  const commentArray = commentData[0].comments;

  res.render('image', {thumbpath: thumburi, path: uri, comments: commentArray, imageid: imageID});
};

const createThumbImage = async (req, filePath, newFileName) => {
  let image = sharp(filePath);
  await image.metadata().then(async (metadata) => {
    await image
            .resize(Math.round(metadata.width * 0.3), Math.round(metadata.height * 0.3))
            .toFile(req.file.destination + "/" + newFileName);
            //.catch(err =>{ next(createError(500)) });
  });
};

const uploadImageToStorage = async (req, filePath, newFileName) => {
  const slicedFilePath = filePath.substring(0, filePath.lastIndexOf('/'));
  const thumbFilePath = slicedFilePath + "/" + newFileName;
  let data = fs.readFileSync(filePath);
  let thumbdata = fs.readFileSync(thumbFilePath);

  const params = {
    Bucket: "imagehostingproject",
    Key: req.file.filename,
    Body: data
  };

  const paramstwo = {
    Bucket: "imagehostingproject",
    Key: newFileName,
    Body: thumbdata
  };

  await s3Client.send(new PutObjectCommand(params));
  await s3Client.send(new PutObjectCommand(paramstwo));
};

const upload = async (req, res, next) => {
  if (req.file == null) {
    return next(createError(400));
  }

  const regex = /\\/g;
  const filePath = req.file.path.replace(regex, "/");
  const filenameArray = req.file.filename.split(".");
  const newFileName = filenameArray[0] + "-thumb." + filenameArray[1];

  try {
    await createThumbImage(req, filePath, newFileName);
    await uploadImageToStorage(req, filePath, newFileName, next);
  } catch(error) {
    console.log(error);
    return next(createError(500));
  }

  const path = '/api/images'
  const url = apiOptions.server + path;
  const body = {
    uri: imageserver + '/' + req.file.filename,
    thumburi: imageserver + '/' + newFileName
  };
  let response;
  try {
    response = await fetch(url, {
      method: 'post',
	     body: JSON.stringify(body),
       headers: {'Content-Type': 'application/json'}
    });
  } catch (error) {
     console.log(error);
     return next(createError(500));
  }
  if (response.status !== 201) {
    return next(createError(response.status));
  }

  res.redirect('/');
};

const postComment = async (req, res, next) => {
  if ((req.body.author == "") || (req.body.text == "")) {
    return next(createError(400));
  }
  const path = '/api/comments/'
  const url = apiOptions.server + path + req.params.imageid;
  const body = {
    author: req.body.author,
    text: req.body.text
  };
  try {
    response = await fetch(url, {
      method: 'post',
	     body: JSON.stringify(body),
       headers: {'Content-Type': 'application/json'}
    });
  } catch (error) {
     console.log(error);
     return next(createError(500));
  }
  if (response.status !== 201) {
    return next(createError(response.status));
  }

  res.redirect(`/image/${req.params.imageid}`);
};


module.exports = {
  homepage,
  getImage,
  upload,
  postComment
};
