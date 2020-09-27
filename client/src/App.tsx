import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { MerchantEdit } from './page/MerchantEdit';
import { MerchantHome } from './page/MerchantHome';

const App = (): ReactElement => (
  <Router>
    <div>
      <nav>
        <ul>
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
