import React from 'react';

import Producer from './containers/Producer';
import Consumer from './containers/Consumer';

import {
  SiteWrapper,
  PageTitle,
  RoleWrapper,
  SingleRoleWrapper,
} from './components/Global.styles';

class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      role: null,
    };
  }

  setRole = (role) => {
    this.setState({role: role})
  }

  checkIfAllowed = () => {
    const inputPassword = window.prompt('Please enter password', '');
    
    if (inputPassword === '1234') {
      this.setRole('producer')
    }
  } 

  render() {
    return (
      <SiteWrapper>
        {
          !this.state.role ? (
            <div>
              <PageTitle>Choose who you are</PageTitle>
              <RoleWrapper>
                <SingleRoleWrapper onClick={() => this.checkIfAllowed()}>Procudcer</SingleRoleWrapper>
                <SingleRoleWrapper onClick={() => this.setRole('consumer')}>Consumer</SingleRoleWrapper>  
              </RoleWrapper>
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
      </SiteWrapper>
    )
  }
}

export default Home;