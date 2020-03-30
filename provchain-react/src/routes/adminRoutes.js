
import Dashboard from "../views/Dashboard";
import CreateConsumer from "../views/createConsumer";
import CreateManufacturer from "../views/createManufacturer";
import ListCustomer from "../views/listConsumers";
import ListVehicles from "../views/listVehicles";
import ListManufacturer from "../views/listManufacturer";
import OwnerChange from "../views/ownerChange";

import 'remixicon/fonts/remixicon.css'

var AdminRoute = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ri-dashboard-line text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/ownerChange",
    name: "Owner Change",
    icon: "ri-swap-box-line text-red",
    component: OwnerChange,
    layout: "/admin"
  },
  {
    path: "/createConsumer",
    name: "Create Consumer",
    icon: "ri-user-add-line text-primary",
    component: CreateConsumer,
    layout: "/admin"
  },
  {
    path: "/createManufactrer",
    name: "Create Manufacturer",
    icon: "ri-user-add-line text-primary",
    component: CreateManufacturer,
    layout: "/admin"
  },
  {
    path: "/listCustomers",
    name: "List Customers",
    icon: "ri-file-list-2-line text-red",
    component: ListCustomer,
    layout: "/admin"
  },
  {
    path: "/listManufacturers",
    name: "List Manufacturers",
    icon: "ri-file-list-2-line text-red",
    component: ListManufacturer,
    layout: "/admin"
  },
  {
    path: "/listVehicles",
    name: "List Vehicles",
    icon: "ri-file-list-2-line text-red",
    component: ListVehicles,
    layout: "/admin"
  }
];
export default AdminRoute;
