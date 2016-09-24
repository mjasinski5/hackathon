import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class LandingPage extends Component {
  render(){
    const { store } = this.props; 
    return(
      <h1>{store.name}{store.society.get('0-9').size}</h1>
    );
  }
}