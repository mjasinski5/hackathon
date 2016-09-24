import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store'; 
import society from './model/society';
import App from './App';

const store =  new Store({society});

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
