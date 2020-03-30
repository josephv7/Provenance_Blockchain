
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import AuthLayout from "layouts/Auth.js";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Redirect path ="/admin" to="/admin/dashboard" />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);