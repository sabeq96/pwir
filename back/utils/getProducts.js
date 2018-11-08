const state = require('../state');

const getCustomerItems = (customerId) =>
  state.productList.map((product) => {
    const lobby = product.lobby.filter((id) => id === customerId);
    const owned = product.owned.filter((id) => id === customerId);

    return {
      name: product.name,
      lobby: lobby.length,
      owned: owned.length,
    }
  });

  const getProducerItems = (producerId) =>
    state.productList.map((product) => {
      const qt = product.qt.filter((id) => id === producerId);
      const inProduction = product.inProduction.filter((id) => id === producerId)
  
      return {
        name: product.name,
        qt: qt.length,
        inProduction: inProduction.length,
      }
    });

    module.exports = {
      getCustomerItems,
      getProducerItems,
    };