import Dashboard from "../views/Dashboard";
import CreateConsumer from "../views/createConsumer";
import ListCustomer from "../views/listConsumers";
import ListVehicles from "../views/listVehicles";
import 'remixicon/fonts/remixicon.css'
import OwnerChange from "../views/ownerChange";

var DealerRoute = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ri-dashboard-line text-primary",
        component: Dashboard,
        layout: "/dealer"
    },
    {
        path: "/createConsumer",
        name: "Create Consumer",
        icon: "ri-user-add-line text-primary",
        component: CreateConsumer,
        layout: "/dealer"
    },
    {
        path: "/listCustomers",
        name: "List Customers",
        icon: "ri-file-list-2-line text-red",
        component: ListCustomer,
        layout: "/dealer"
    },
    {
        path: "/listVehicles",
        name: "List Vehicles",
        icon: "ri-file-list-2-line text-red",
        component: ListVehicles,
        layout: "/dealer"
    },
    {
        path: "/ownerChange",
        name: "Owner Change Request",
        icon: "ri-user-add-line text-primary",
        component: OwnerChange,
        layout: "/dealer"
    },
];
export default DealerRoute;
