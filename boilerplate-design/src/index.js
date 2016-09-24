import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
require('../css/style.css');

const app = (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById('root')
);
