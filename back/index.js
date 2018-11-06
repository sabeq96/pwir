const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let state = {
  productList: [
    { name: 'a', qt: 2, lobby: [] },
    { name: 'b', qt: 0, lobby: [] },
    { name: 'c', qt: 5, lobby: [] },
    { name: 'd', qt: 3, lobby: [] },
  ], 
  users: [],
}

const getCustomerProducts = (customerId) =>
  state.productList.map((product) => {
    const qt = product.lobby.filter((id) => id === customerId);
    return {
      name: product.name,
      qt: qt.length, 
    }
  })

io.of('/consumer').on('connection', (socket) => {
  console.log(socket.id, 'connected to customers');
  socket.emit('GET_PRODUCT_LIST', { productList: getCustomerProducts(socket.id) });
  
  socket.on('ORDER_PRODUCT', ({ productId }) => {
    state.productList.forEach((product) => {
      return product.name === productId ? product.lobby.push(socket.id) : product
    })
    
    socket.emit('GET_PRODUCT_LIST', { productList: getCustomerProducts(socket.id) });
    console.log(socket.id, 'ordered', productId);
  });

  socket.on('CANCEL_PRODUCT', ({ productId }) => {
    state.productList.forEach((product) => {
      if (product.name === productId) {
        const index = product.lobby.lastIndexOf((id) => id === socket.id);
        return product.lobby.splice(index, 1)
      } else return product;
    })
  
    socket.emit('GET_PRODUCT_LIST', { productList: getCustomerProducts(socket.id) });
    console.log(socket.id, 'canceled', productId);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected from consumers');
  });
});

io.of('/producer').on('connection', (socket) => {
  console.log('a user connected to producers');

  socket.on('disconnect', () => {
    console.log('a user disconnected from producers');
  });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});