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

  render() {
    return (
      <SiteWrapper>
        {
          !this.state.role ? (
            <div>
              <PageTitle>Choose who you are</PageTitle>
              <RoleWrapper>
                <SingleRoleWrapper onClick={() => this.setRole('producer')}>Procudcer</SingleRoleWrapper>
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