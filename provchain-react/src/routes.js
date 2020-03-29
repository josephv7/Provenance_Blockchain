
import Index from "views/Index.js";
import Form from "views/Form.js";
import Tables from "views/Tables.js";
import Login from "views/Login"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/form",
    name: "Form",
    icon: "ni ni-single-02 text-yellow",
    component: Form,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "List",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  }
];
export default routes;
