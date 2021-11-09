const createError = require('http-errors');
const sharp = require('sharp');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const apiOptions = {
  server: 'http://localhost:3200'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://fathomless-wave-52759.herokuapp.com';
}

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
  //const thumburi = imageData[0].thumburi;
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

  res.render('image', {path: uri, comments: commentArray, imageid: imageID});
};

const upload = async (req, res, next) => {
  if (req.file == null) {
    return next(createError(400));
  }

  let regex = /\\/g;
  let filePath = req.file.path.replace(regex, "/")
  //console.log(filePath);
  let filenameArray = req.file.filename.split(".");
  let newFileName = filenameArray[0] + "-thumb." + filenameArray[1];
  //console.log(newFileName);
  let image = sharp(filePath);
  try {
    await image.metadata().then(function(metadata) {
      image
          .resize(Math.round(metadata.width * 0.3), Math.round(metadata.height * 0.3))
          .toFile(req.file.destination + "/" + newFileName)
          .catch(err =>{ next(createError(500)) });
    });
  } catch(error) {
    console.log(error);
    return next(createError(500));
  }

  const path = '/api/images'
  const url = apiOptions.server + path;
  const body = {
    uri: req.file.filename,
    thumburi: newFileName
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
