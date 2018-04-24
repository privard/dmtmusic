import React from 'react';
import { render } from 'react-dom';

import '../node_modules/bulma/css/bulma.css';
import './assets/css/theme.css';

import { HashRouter } from 'react-router-dom'
import App from './components/App';

render((
  <HashRouter>
    <App/>
  </HashRouter>
), document.getElementById('app'));
