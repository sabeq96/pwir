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

    this.produce = this.produce.bind(this);
    this.socket = io('http://localhost:3001/producer');
  }

  componentDidMount(){
    this.socket.on('GET_PRODUCT_LIST', (data) => this.setState({productList: data.productList}))
  }

  componentWillUnmount(){
    this.socket.close();
  }

  produce(productId){
    this.socket.emit('START_PRODUCTION', { productId});
    
    setTimeout(() => {
      this.socket.emit('FINISH_PRODUCT', { productId });
    }, this.state.PRODUCING_TIME)
  }

  render(){
    return (
      <Producer
        onProduce={this.produce}
        {...this.state}
        {...this.props}
      />
    ) 
  }
}

export default ProducerPage;