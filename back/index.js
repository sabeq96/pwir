const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let state = {
  productList: [
    { name: 'a', qt: [], lobby: [], inProduction: [], owned: [] },
    { name: 'b', qt: [], lobby: [], inProduction: [], owned: [] },
    { name: 'c', qt: [], lobby: [], inProduction: [], owned: [] },
    { name: 'd', qt: [], lobby: [], inProduction: [], owned: [] },
  ], 
  users: [],
}

const CONSUMERS = io.of('/consumer');
const PRODUCERS = io.of('/producer');

// setInterval(() => console.log(state.productList), 1000);

const getCustomerOrders = (customerId) =>
  state.productList.map((product) => {
    const lobby = product.lobby.filter((id) => id === customerId);
    const owned = product.owned.filter((id) => id === customerId);

    return {
      name: product.name,
      lobby: lobby.length,
      owned: owned.length,
    }
  });

  const getProducerQt = (producerId) =>
    state.productList.map((product) => {
      const qt = product.qt.filter((id) => id === producerId);
      const inProduction = product.inProduction.filter((id) => id === producerId)
  
      return {
        name: product.name,
        qt: qt.length,
        inProduction: inProduction.length,
      }
    });

CONSUMERS.on('connection', (socket) => {
  console.log(socket.id, 'connected to customers');
  socket.emit('GET_PRODUCT_LIST', { productList: getCustomerOrders(socket.id) });
  
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
          
          PRODUCERS.to(`${whoProduced}`).emit('GET_PRODUCT_LIST', { productList: getProducerQt(whoProduced) })    
        } else return product
      })
    } else {
      console.log(socket.id, 'ordered', productId);
      state.productList.forEach((product) => (
        product.name === productId ? product.lobby.push(socket.id) : product
      ));
    }
    
    socket.emit('GET_PRODUCT_LIST', { productList: getCustomerOrders(socket.id) });
  });

  socket.on('CANCEL_ORDER', ({ productId }) => {
    console.log(socket.id, 'canceled', productId);
    state.productList.forEach((product) => {
      if (product.name === productId) {
        const index = product.lobby.lastIndexOf((id) => id === socket.id);
        return product.lobby.splice(index, 1);
      } else return product;
    })
  
    socket.emit('GET_PRODUCT_LIST', { productList: getCustomerOrders(socket.id) });
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected from consumers');
  });
});

PRODUCERS.on('connection', (socket) => {
  console.log(socket.id, 'connected to producers');
  socket.emit('GET_PRODUCT_LIST', { productList: getProducerQt(socket.id) });

  socket.on('START_PRODUCTION', ({ productId }) => {
    console.log(socket.id, 'just started producting', productId);  
    state.productList.forEach((product) => {
      return product.name === productId ?
        product.inProduction.push(socket.id)
      : product;
    });
    
    socket.emit('GET_PRODUCT_LIST', { productList: getProducerQt(socket.id) });
  });
  
  socket.on('FINISH_PRODUCT', ({ productId }) => {
    console.log(socket.id, 'finished', productId);

    state.productList.forEach((product) => {
      if (product.name === productId) {
        const index = product.inProduction.lastIndexOf((id) => id === socket.id);
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

        CONSUMERS.to(`${whoWant}`).emit('GET_PRODUCT_LIST', { productList: getCustomerOrders(whoWant) });
        console.log(socket.id, 'send', productId, 'to', whoWant);
      } else if (product.name === productId) {
        product.qt.push(socket.id);
        console.log(socket.id, 'added', productId, 'to warehouse');
      } else return product;
    })

    socket.emit('GET_PRODUCT_LIST', { productList: getProducerQt(socket.id) });
  })

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected from producers');    
  });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});