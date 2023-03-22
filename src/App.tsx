import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/dashboard';

import './index.css';

const App = () => (
  <div className="container">
    <Dashboard />
  </div>
);
ReactDOM.render(<App />, document.getElementById('app'));
