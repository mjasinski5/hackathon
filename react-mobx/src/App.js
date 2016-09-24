import React, { Component } from 'react';
import LandingPage from './components/LandingPage';

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <LandingPage store={store} />
      </div>
    );
  }
}

export default App;
