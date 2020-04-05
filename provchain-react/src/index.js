import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import CustomerLayout from "layouts/Customer";
import AuthLayout from "layouts/Auth.js";
import ManufacturerLayout from "layouts/Manufacturer";
import DealerLayout from "layouts/Dealer";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />}/>
            <Redirect path="/admin" to="/admin/dashboard"/>
            <Route path="/customer" render={props => <CustomerLayout {...props} />}/>
            <Redirect path="/customer" to="/customer/dashboard"/>
            <Route path="/manufacturer" render={props => <ManufacturerLayout {...props} />}/>
            <Redirect path="/manufacturer" to="/manufacturer/dashboard"/>
            <Route path="/dealer" render={props => <DealerLayout {...props} />}/>
            <Redirect path="/dealer" to="/dealer/dashboard"/>
            <Route path="/auth" render={props => <AuthLayout {...props} />}/>
            <Redirect from="/" to="/auth/login"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
