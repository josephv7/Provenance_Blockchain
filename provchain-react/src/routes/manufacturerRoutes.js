
import Dashboard from "../views/Dashboard";
import CreateConsumer from "../views/createConsumer";
import ListCustomer from "../views/listConsumers";
import ListVehicles from "../views/listVehicles";
import CreateVehicle from "../views/createVehicle";
import 'remixicon/fonts/remixicon.css'
import DealerTransfer from "../views/dealerTransfer";

var ManufacturerRoute = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ri-dashboard-line text-primary",
        component: Dashboard,
        layout: "/manufacturer"
    },
    {
        path: "/createVehicle",
        name: "Create Vehicle",
        icon: "ri-user-add-line text-primary",
        component: CreateVehicle,
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
    },
    {
        path: "/dealerTransfer",
        name: "Dealer Transfer",
        icon: "ri-user-add-line text-primary",
        component: DealerTransfer,
        layout: "/manufacturer"
    }
];
export default ManufacturerRoute;
