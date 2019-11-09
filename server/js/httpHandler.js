const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// const messages = require('./messageQueue');
const keypressHandler = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// keypressHandler.initialize(messages.enqueue) // added during STEP 4 process // refactored with Eric to use messageQueue (THIS ACTUALLY DOUBLES THE KEY STROKES BC ITS INITIALIZED IN INDEX, thanks Eric)

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);


  // STEP 2: created method for server to RESPOND with random direction, given that it is a 'GET' request
  // if (req.method === 'GET') {
  //   var dirArray = ['up', 'down', 'left', 'right'];
  //   var direction = dirArray[Math.floor(Math.random() * dirArray.length)];
  // }
  // res.writeHead(200, headers);
  // // during STEP 2: have the server send a RESPONSE to the 'GET' request through .write() method
  // res.write(direction);

  // res.end();
  // next(); // invoke next() at the end of a request to help with testing!
  // // END OF STEP 2


  // /* STEP 4: refactor server program so that instead of responding with random commands,
  // the user's directional keypresses and typed commands from the server terminal
  // are sent in response
  // */

  if (req.method === 'OPTIONS' || req.method === 'GET') {
    // during STEP 4, we imported randomize to send a random response to the client when no action is queued
    if (req.method === 'GET') {
      var dirArray = ['up', 'down', 'left', 'right'];
      var direction = dirArray[Math.floor(Math.random() * dirArray.length)];
    }

    // STEP 4: set variable command to messages.dequeue() to remove actions from the QUEUE
    // if `command` exists (which means if there is a QUEUE), we want to write `command` as a response to the client
    // let command = messages.dequeue(); // refactored with Eric
    let command = messageQueue.dequeue();

    if (command) {
      res.writeHead(200, headers);
      res.write(command);
    } else { // conditional statement; if there is no queue for `command`, write randomized actions to client
      res.writeHead(200, headers);
      res.write(direction);
    }
  }

  // res.writeHead(200, headers); // commented out in STEP 4 because if-statement already contains res.writeHead()
  // res.write(direction); // commented out because the server already sends a RESPONSE to the 'GET' request through .write() method in STEP 4

  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
