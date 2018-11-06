import React from 'react';
import Producer from '../components/Producer';
import io from 'socket.io-client';

class ProducerPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      productList: [],
    };

    this.socket = io('http://localhost:3001/producer');
  }

  componentDidMount(){
    this.socket.on('PRODUCT_LIST', (data) => this.setState({productList: data.productList}))
  }

  componentWillUnmount(){
    this.socket.close();
  }

  render(){
    return <Producer {...this.state} {...this.props}/>
  }
}

export default ProducerPage;