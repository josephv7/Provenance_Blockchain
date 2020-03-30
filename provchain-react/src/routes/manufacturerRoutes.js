
import Dashboard from "../views/Dashboard";
import CreateConsumer from "../views/createConsumer";
import ListCustomer from "../views/listConsumers";
import ListVehicles from "../views/listVehicles";
import 'remixicon/fonts/remixicon.css'

var ManufacturerRoute = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ri-dashboard-line text-primary",
        component: Dashboard,
        layout: "/manufacturer"
    },
    {
        path: "/createConsumer",
        name: "Create Consumer",
        icon: "ri-user-add-line text-primary",
        component: CreateConsumer,
        layout: "/manufacturer"
    },
    {
        path: "/listCustomers",
        name: "List Customers",
        icon: "ri-file-list-2-line text-red",
        component: ListCustomer,
        layout: "/manufacturer"
    },
    {
        path: "/listVehicles",
        name: "List Vehicles",
        icon: "ri-file-list-2-line text-red",
        component: ListVehicles,
        layout: "/manufacturer"
    }
];
export default ManufacturerRoute;
