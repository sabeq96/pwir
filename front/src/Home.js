import React from 'react';

import Producer from './containers/Producer';
import Consumer from './containers/Consumer';

class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      role: null,
      productList: [
        { name: 'a', qt: 2 },
        { name: 'b', qt: 0 },
        { name: 'c', qt: 5 },
        { name: 'd', qt: 3 },
      ],
    };
  }

  setRole = (role) => {
    this.setState({role: role})
  }

  render() {
    return (
      <React.Fragment>
        {
          !this.state.role ? (
            <div>
              <div>Choose who you are</div>
              <div onClick={() => this.setRole('producer')}>Procudcer</div>
              <div onClick={() => this.setRole('consumer')}>Consumer</div>  
            </div>
          ) : this.state.role === 'producer' ? (
            <Producer 
              onSetRole={this.setRole}
            />
          ) : (
            <Consumer
              onSetRole={this.setRole}
            />
          )
        }
      </React.Fragment>
    )
  }
}

export default Home;