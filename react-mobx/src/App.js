import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from 'components/LandingPage';
import Game from 'components/Game';

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <main>
          <Router history={browserHistory}>
            <Route path="/" component={LandingPage} store={store} />
            <Route path="app" component={Game} store={store} />
          </Router>
        </main>
      </MuiThemeProvider>    );
  }
}

export default App;
