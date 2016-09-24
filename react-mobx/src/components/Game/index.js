import React, { Component } from 'react';
import { observer } from 'mobx-react';

import LeftAside from 'components/LeftAside';
import RightAside from 'components/RightAside';

@observer
export default class App extends Component {

  render(){
    const { store } = this.props.route;
    console.log('income', store.getTotalIncome)
    console.log('outcome', store.getTotalOutcome)
    console.log('currentLoanState', store.currentLoanState)
    console.log('isLoadAllowed', store.isLoadAllowed)
    console.log('maximumLoanValue', store.maximumLoanValue)
    return(
        <div>
          <LeftAside store={store} />
          <RightAside store={store} />
          
        </div>
    );
  }
}