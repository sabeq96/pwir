import React from 'react';
import Producer from '../components/Producer';
import io from 'socket.io-client';

class ProducerPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      productList: [],
      PRODUCING_TIME: 3000,
      inProduction: false,
    };

    this.socket = io('http://localhost:3001/producer');
    // this.startProduction = this.startProduction.bind(this);
    this.production = setInterval(() => this.startProduction(), this.state.PRODUCING_TIME + 1000);
  }

  chooseProductToProduce(productList){
    const chances = productList.map((product) => ({
      name: product.name,
      chance: product.lobby_total - product.inProduction_total
    }));
    
    let choosedProduct = chances.reduce((prev, current) => prev.chance < current.chance ? current : prev)
    if(choosedProduct.chance === 0){
      choosedProduct = productList[Math.floor(Math.random() * productList.length)];
    }

    return choosedProduct.name;
  }

  startProduction = () => {
    if (!this.state.inProduction) {
      const productId = this.chooseProductToProduce(this.state.productList);
      this.produce(productId);
    }
  }

  componentDidMount(){
    this.socket.on('GET_PRODUCT_LIST', (data) => {
      this.setState({ productList: data.productList })
    });
  }

  componentWillUnmount(){
    this.socket.close();
    clearInterval(this.production);
  }

  produce(productId){
    this.setState({inProduction: true})
    this.socket.emit('START_PRODUCTION', { productId });

    setTimeout(() => {
      this.setState({inProduction: false})
      this.socket.emit('FINISH_PRODUCT', { productId });
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