//const {readdirSync} = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = '';
}

const homepage = async (req, res) => {
  const path = '/api/images'
  const url = apiOptions.server + path;
  const response = await fetch(url);
  //TODO: rest api response error handling
  console.log(response);
  if (response.status === 404) {
    return res.render('index', { title: 'Simple Image Hosting Site', images: []});
  }
  const imageData = await response.json();
  console.log(imageData);
  imageData.reverse();
  res.render('index', { title: 'Simple Image Hosting Site', images: imageData});
};

const getImage = async (req, res) => {
  const path = '/api/images/'
  const url = apiOptions.server + path + req.params.imagepath;
  const response = await fetch(url);
  //TODO: rest api response error handling
  console.log(response);
  if (response.status === 404) {
    return next(err);
  }
  const imageData = await response.json();
  console.log(imageData);
  const uri = imageData[0].uri;
  console.log(uri);
  res.render('image', {path: uri});
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
  const imageData = await response.json();
  console.log(imageData);
  //TODO: rest api response error handling

  res.redirect('/');
  /*
  let filename = './uploads/' + req.file.filename;
  appendfile("./public/uploads/1.jpg", filename, function(err) {
    if (err) throw err;
  });
  */
};


module.exports = {
  homepage,
  getImage,
  upload
};
