import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftAside from 'components/LeftAside';
import RightAside from 'components/RightAside';
import LandingPage from 'components/LandingPage';

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <main>
          <LandingPage />
        </main>
      </MuiThemeProvider>    );
  }
}

export default App;
