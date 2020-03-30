import Dashboard from "../views/Dashboard";
import ListVehicles from "../views/listVehicles";

import 'remixicon/fonts/remixicon.css'

var CustomerRoute = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ri-dashboard-line text-primary",
        component: Dashboard,
        layout: "/customer"
    },
    {
        path: "/listVehicles",
        name: "List Vehicles",
        icon: "ri-file-list-2-line text-red",
        component: ListVehicles,
        layout: "/customer"
    }
];

export default CustomerRoute;