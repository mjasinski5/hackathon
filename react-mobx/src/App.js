import React, { Component } from 'react';
// import LandingPage from './components/LandingPage';
import LeftAside from 'components/LeftAside';
import RightAside from 'components/RightAside';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <main>
          <LeftAside store={store} />
        </main>
      </MuiThemeProvider>    );
  }
}

export default App;
