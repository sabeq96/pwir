import React from 'react';
import Producer from '../components/Producer';
import io from 'socket.io-client';

class ProducerPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      productList: [],
      PRODUCING_TIME: 3000,
    };

    this.socket = io('http://localhost:3001/producer');
    this.startProduction = this.startProduction.bind(this);
    this.production = setInterval(() => this.startProduction(), this.state.PRODUCING_TIME + 10)
  }

  somethingInProduction(productList){
    return productList.some((product) => 
      product.inProduction_me > 0
    )
  }

  chooseProductToProduce(productList){
    const chances = productList.map((product) => ({
      name: product.name,
      chance: (product.qt_me > 0) ?
        (1 - (product.qt_me/product.qt_total)) * 100
        : 100
    }));
    
    const choosedProduct = chances.reduce((prev, next) => prev.chance < next.chance ? next : prev)
    return choosedProduct.name;
  }

  startProduction() {
    if (!this.somethingInProduction(this.state.productList)) {
      const productId = this.chooseProductToProduce(this.state.productList);
      this.produce(productId);
    }
  }

  componentDidMount(){
    this.socket.on('GET_PRODUCT_LIST', (data) => {
      console.log(data.productList);
      this.setState({ productList: data.productList })
    });
  }

  componentWillUnmount(){
    this.socket.close();
    clearInterval(this.production);
  }

  produce(productId){
    this.socket.emit('START_PRODUCTION', { productId });
    console.log(new Date().getTime());
    console.log('produce')
    setTimeout(() => {
      this.socket.emit('FINISH_PRODUCT', { productId });
      console.log('finished')
    }, this.state.PRODUCING_TIME)
  }

  render(){
    return (
      <Producer
        {...this.state}
        {...this.props}
      />
    ) 
  }
}

export default ProducerPage;