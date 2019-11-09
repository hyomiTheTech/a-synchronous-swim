const queue = require('./js/messageQueue'); // imported AFTER STEP 4 due to refactoring with Eric


const keypressHandler = require('./js/keypressHandler');
// keypressHandler.initialize(message => console.log(`Message received: ${message}`)); // refactored with Eric to initialize keypressHandler HERE instead of in httpHandler.js
keypressHandler.initialize(queue.enqueue);

const httpHandler = require('./js/httpHandler');
httpHandler.initialize(queue); // initialized httpHandler after refactoring with Eric


const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
