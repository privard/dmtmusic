import React from 'react';
import { render } from 'react-dom';

import '../node_modules/bulma/css/bulma.css';
import './assets/css/theme.css';

import { HashRouter } from 'react-router-dom'
import AppContainer from './containers/AppContainer';
import http from './service/http';

http.init({
  baseUrl: '/api'
});

render((
  <HashRouter>
    <AppContainer />
  </HashRouter>
), document.getElementById('app'));
