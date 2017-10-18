// 'use strict'
// import React from 'react'
// // import { render } from 'react-dom'
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// // import { Provider } from 'react-redux'

// // import store from './store'
// import Root from './components/Root';

// ReactDOM.render(
//   <Router>
//     <Root />
//   </Router>,
//   document.getElementById('main')
// );

import React from 'react';
import { HashRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Root from './components/Root';

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('main')
);