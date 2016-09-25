import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from 'components/LandingPage';
import Game from 'components/Game';
import Results from 'components/Results';

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

  getNotificationsStyle(){
    return {
      Containers: {
        DefaultStyle: {
          fontFamily: 'Roboto Slab',
          width: 500
        }
      },
      NotificationItem: {
        DefaultStyle: {
          borderRadius: '0',
          padding: '20px'
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
      Title: {
        warning: {
          color: '#000'
        },
        success: {
          color: '#000'
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
    }
  }

  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <main>
          <NotificationSystem 
            ref={(ref) => this._notificationSystem = ref}
            style={this.getNotificationsStyle()}
          />
          <Router history={browserHistory}>
            <Route path="/" component={LandingPage} store={store} />
            <Route path="app" component={Game} store={store} />
            <Route path="result" component={Results} store={store} />
          </Router>
        </main>
      </MuiThemeProvider>    );
  }
}

export default App;
