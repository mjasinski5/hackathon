import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotificationSystem from 'react-notification-system';

import LeftAside from 'components/LeftAside';
import RightAside from 'components/RightAside';
// import { jsonToChartData_dogHunt } from 'commons/transform';
// import json from 'organisms/jsonData2.json';

@observer
export default class App extends Component {
  componentDidMount(){
    // const { notifications } = this.props;
    // notifications.forEach((notification) => notification(this._notificationSystem.addNotification));
    // const moxData = jsonToChartData_dogHunt(json);
    // console.log(moxData.values());
}

  render(){
    const { store } = this.props;
    return(
      <MuiThemeProvider>
        <main>
          <LeftAside store={store} />
          <RightAside store={store} />
          <NotificationSystem ref={(ref) => this._notificationSystem = ref} />
        </main>
      </MuiThemeProvider>
    );
  }
}