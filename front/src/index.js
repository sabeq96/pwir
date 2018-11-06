import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Home';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <Home/>,
  document.getElementById('app')
);

module.hot.accept();