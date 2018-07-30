import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import Main from './Main';

const App = hot(module)(Main);

ReactDOM.render(
  <App width={1280} height={800} />,
  document.getElementById('app')
);
