import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { MerchantEdit } from './page/MerchantEdit';
import { MerchantHome } from './page/MerchantHome';
import './App.css';

const App = (): ReactElement => (
  <Router>
    <div className="app">
      <nav>
        <ul className="nav-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/merchant">Create Merchant</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/merchant/:id?">
          <MerchantEdit />
        </Route>
        <Route path="/">
          <MerchantHome />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
