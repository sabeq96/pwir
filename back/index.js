const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const CONSUMERS = io.of('/consumer');
const PRODUCERS = io.of('/producer');

const startProducers = require('./producers')({ PRODUCERS, CONSUMERS });
const startCustomers = require('./customers')({ PRODUCERS, CONSUMERS });

http.listen(3001, () => {
  console.log('listening on *:3001');
});