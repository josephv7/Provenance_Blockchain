
import Login from "../views/Login.js";

import 'remixicon/fonts/remixicon.css'

var AuthRoute = [
  {
    path: "/login",
    name: "Login",
    icon: "ri-dashboard-line text-primary",
    component: Login,
    layout: "/auth"
  }
];
export default AuthRoute;
