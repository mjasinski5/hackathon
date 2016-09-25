import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from 'components/LandingPage';
import Game from 'components/Game';

import notifications from 'model/notifications'
import notificationsFunc from 'commons/notification';
import NotificationSystem from 'react-notification-system';

class App extends Component {
   componentDidMount() {
    const { store } = this.props;
    
    const createNotification = notificationsFunc(store);
    const notificationsToAdd = notifications.map((props) => createNotification(props));
    notificationsToAdd.forEach((notification) => notification(this._notificationSystem.addNotification));
  }
  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <main>
          <NotificationSystem 
            ref={(ref) => this._notificationSystem = ref}
            style={{
              Containers: {
                DefaultStyle: {
                  fontFamily: 'Roboto Slab',
                }
              },
              NotificationItem: {
                DefaultStyle: {
                  borderRadius: '0'
                },
                warning: {
                  borderTop: '0',
                  color: '#fff',
                  backgroundColor: '#d83941',
                },
                success: {
                  borderTop: '0',
                  color: '#fff',
                  backgroundColor: '#40b572'
                }
              },
              Dismiss: {
                DefaultStyle: {
                  backgroundColor: '#fff'
                },
                warning: {
                  color: '#d83941'
                },
                success: {
                  color: '#40b572'
                }
              }
            }}
          />
          <Router history={browserHistory}>
            <Route path="/" component={LandingPage} store={store} />
            <Route path="app" component={Game} store={store} />
          </Router>
        </main>
      </MuiThemeProvider>    );
  }
}

export default App;
