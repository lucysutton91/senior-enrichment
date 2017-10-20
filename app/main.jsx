import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Root from './components/Root';

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('main')
);
