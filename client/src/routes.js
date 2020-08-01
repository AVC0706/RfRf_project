import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import MandalRegister from "./views/Auth/Register/MandalRegister";
import { BrowserRouter as Router } from "react-router-dom";
import StateAdmin from "./views/StateAdmin/StateAdmin";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/" exact component={HomePage} /> */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mandalregister" component={MandalRegister} />
          <Route path="/stateAdmin" component={StateAdmin} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
