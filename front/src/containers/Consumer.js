import React from 'react';
import Consumer from '../components/Consumer';
import io from 'socket.io-client';

class ConsumerPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      productList: [],
    };

    this.socket = io('http://localhost:3001/consumer');
    this.orderProduct = this.orderProduct.bind(this);
    this.cancelProduct = this.cancelProduct.bind(this);
    this.refreshData;
  }

  componentDidMount(){
    this.socket.on('GET_PRODUCT_LIST', (data) => this.setState({productList: data.productList}))
    
    this.socket.on('I_GIVE_U_DATA', (data) => this.setState({productList: data.productList}))
    this.refreshData = setInterval(() => this.socket.emit('GIVE_ME_DATA'), 500);
  }

  componentWillUnmount(){
    this.socket.close();
    clearInterval(this.refreshData);
  }

  orderProduct(productId){
    this.socket.emit('ORDER_PRODUCT', {productId});
  }
  
  cancelProduct(productId){
    this.socket.emit('CANCEL_ORDER', {productId});
  }

  render(){
    return (
      <Consumer
        onOrderProduct={this.orderProduct}
        onCancelProduct={this.cancelProduct}
        {...this.state}
        {...this.props}
      />
    )
  }
}

export default ConsumerPage;