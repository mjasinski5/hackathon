import React, { Component } from 'react';
import { observer } from 'mobx-react';

import LeftAside from 'components/LeftAside';
import RightAside from 'components/RightAside';

@observer
export default class App extends Component {

  render(){
    const { store } = this.props.route;
    return(
        <div>
          <p>Name: {store.name}</p>
          <LeftAside store={store} />
          <RightAside store={store} />
        </div>
    );
  }
}