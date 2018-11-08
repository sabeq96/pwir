const getCustomerItems = require('./utils/getProducts').getCustomerItems;
const getProducerItems = require('./utils/getProducts').getProducerItems;
const state = require('./state');

const start = ({ PRODUCERS, CONSUMERS }) => CONSUMERS.on('connection', (socket) => {
  console.log(socket.id, 'connected to customers');
  socket.emit('GET_PRODUCT_LIST', { productList: getCustomerItems(socket.id) });
  
  socket.on('ORDER_PRODUCT', ({ productId }) => {
    if (state.productList.some((product) =>
      product.name === productId
      && product.qt.length > 0
    )) {
      console.log(socket.id, 'recieved', productId);
      state.productList.forEach((product) => {
        if (product.name === productId) {
          const whoProduced = product.qt.shift();
          product.owned.push(socket.id);
          
          PRODUCERS.to(`${whoProduced}`).emit('GET_PRODUCT_LIST', { productList: getProducerItems(whoProduced) })    
        } else return product
      })
    } else {
      console.log(socket.id, 'ordered', productId);
      state.productList.forEach((product) => (
        product.name === productId ? product.lobby.push(socket.id) : product
      ));
    }
    
    socket.emit('GET_PRODUCT_LIST', { productList: getCustomerItems(socket.id) });
  });

  socket.on('CANCEL_ORDER', ({ productId }) => {
    console.log(socket.id, 'canceled', productId);
    state.productList.forEach((product) => {
      if (product.name === productId) {
        const index = product.lobby.lastIndexOf((id) => id === socket.id);
        return product.lobby.splice(index, 1);
      } else return product;
    })
  
    socket.emit('GET_PRODUCT_LIST', { productList: getCustomerItems(socket.id) });
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected from consumers');
  });
});

module.exports = start;