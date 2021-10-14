const createError = require('http-errors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const apiOptions = {
  server: 'http://localhost:3200'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = '';
}

const homepage = async (req, res) => {
  const path = '/api/images'
  const url = apiOptions.server + path;
  const response = await fetch(url);
  //TODO: rest api response error handling
  //console.log(response);
  if (response.status === 404) {
    return res.render('index', { title: 'Simple Image Hosting Site', images: []});
  }
  if (response.status !== 200) {
    return next(createError(response.status));
  }
  const imageData = await response.json();
  //console.log(imageData);
  imageData.reverse();
  res.render('index', { title: 'Simple Image Hosting Site', images: imageData});
};

const getImage = async (req, res) => {
  const path = '/api/images/'
  const url = apiOptions.server + path + req.params.imagepath;
  const response = await fetch(url);
  //TODO: rest api response error handling
  //console.log(response);
  if (response.status !== 200) {
    return next(createError(response.status));
  }
  const imageData = await response.json();
  const uri = imageData[0].uri;
  //console.log(uri);

  const pathtwo = '/api/comments/'
  const urltwo = apiOptions.server + pathtwo + req.params.imagepath;
  const responsetwo = await fetch(urltwo);
  //TODO: rest api response error handling
  //console.log(responsetwo);
  if (responsetwo.status !== 200) {
    return next(createError(response.status));
  }
  const commentData = await responsetwo.json();
  //console.log(commentData);
  const commentArray = commentData[0].comments;
  //console.log(commentArray);

  res.render('image', {path: uri, comments: commentArray});
};

const upload = async (req, res) => {
  //console.log(Object.keys(req.file));
  const path = '/api/images'
  const url = apiOptions.server + path;
  const body = {
    uri: req.file.filename
  };
  const response = await fetch(url, {
    method: 'post',
	  body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  if (response.status !== 201) {
    return next(createError(response.status));
  }
  const imageData = await response.json();
  //console.log(imageData);
  //TODO: rest api response error handling

  res.redirect('/');
};

const postComment = async (req, res) => {
  //console.log(Object.keys(req.file));
  const path = '/api/comments/'
  const url = apiOptions.server + path + req.params.imagepath;
  const body = {
    author: req.body.author,
    text: req.body.text
  };
  console.log(body);
  const response = await fetch(url, {
    method: 'post',
	  body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  if (response.status !== 201) {
    return next(createError(response.status));
  }
  const commentData = await response.json();
  //console.log(commentData);
  //TODO: rest api response error handling

  res.redirect(`/image/${req.params.imagepath}`);
};


module.exports = {
  homepage,
  getImage,
  upload,
  postComment
};
