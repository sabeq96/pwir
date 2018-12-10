import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Home';

const title = 'Programowanie współbierzne i równoległe';

ReactDOM.render(
  <Home/>,
  document.getElementById('app')
);

module.hot.accept();