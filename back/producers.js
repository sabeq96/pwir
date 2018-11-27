const getCustomerItems = require('./utils/getProducts').getCustomerItems;
const getProducerItems = require('./utils/getProducts').getProducerItems;
const state = require('./state');


const start = ({ PRODUCERS, CONSUMERS }) => PRODUCERS.on('connection', (socket) => {
  console.log(socket.id, 'connected to producers');
  socket.emit('GET_PRODUCT_LIST', { productList: getProducerItems(socket.id) });

  socket.on('START_PRODUCTION', ({ productId }) => {
    console.log(socket.id, 'just started producting', productId);  
    state.productList.forEach((product) => {
      return product.name === productId ?
        product.inProduction.push(socket.id)
      : product;
    });
    
    socket.emit('GET_PRODUCT_LIST', { productList: getProducerItems(socket.id) });
  });
  
  socket.on('FINISH_PRODUCT', ({ productId }) => {
    console.log(socket.id, 'finished', productId);

    state.productList.forEach((product) => {
      if (product.name === productId) {
        const index = product.inProduction.lastIndexOf(socket.id);

        return product.inProduction.splice(index, 1);
      } else return product;
    });

    state.productList.forEach((product) => {
      if (
        product.name === productId
        && product.lobby.length > 0
      ) {
        const whoWant = product.lobby.shift();
        product.owned.push(whoWant);

        CONSUMERS.to(`${whoWant}`).emit('GET_PRODUCT_LIST', { productList: getCustomerItems(whoWant) });
        console.log(socket.id, 'send', productId, 'to', whoWant);
      } else if (product.name === productId) {
        product.qt.push(socket.id);
        console.log(socket.id, 'added', productId, 'to warehouse');
      } else return product;
    })

    socket.emit('GET_PRODUCT_LIST', { productList: getProducerItems(socket.id) });
  })

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected from producers');    
  });
});

module.exports = start;

