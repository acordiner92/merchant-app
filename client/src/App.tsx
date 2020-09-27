import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Merchant } from "./page/Merchant";
import { MerchantHome } from "./page/MerchantHome";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/merchant/new">Create Merchant</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/merchant/new">
            <Merchant />
          </Route>
          <Route path="/">
            <MerchantHome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
