const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};



module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // STEP 2: created method for server to RESPOND with random direction, given that it is a 'GET' request
  if (req.method === 'GET') {
    var dirArray = ['up', 'down', 'left', 'right'];
    var direction = dirArray[Math.floor(Math.random() * dirArray.length)];
  }

  res.writeHead(200, headers);
  res.write(direction);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
