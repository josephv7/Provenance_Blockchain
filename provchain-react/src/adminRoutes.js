
import Dashboard from "views/Dashboard.js";
import CreateConsumer from "views/createConsumer";
import CreateManufacturer from "views/createManufacturer";
import ListCustomer from "views/listConsumers";
import ListVehicles from "views/listVehicles";
import ListManufacturer from "views/listManufacturer";
import OwnerChange from "views/ownerChange";

var AdminRoute = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/ownerChange",
    name: "Owner Change",
    icon: "ni ni-single-02 text-red",
    component: OwnerChange,
    layout: "/admin"
  },
  {
    path: "/createConsumer",
    name: "Create Consumer",
    icon: "ni ni-single-02 text-yellow",
    component: CreateConsumer,
    layout: "/admin"
  },
  {
    path: "/createManufactrer",
    name: "Create Manufacturer",
    icon: "ni ni-single-02 text-yellow",
    component: CreateManufacturer,
    layout: "/admin"
  },
  {
    path: "/listCustomers",
    name: "List Customers",
    icon: "ni ni-bullet-list-67 text-red",
    component: ListCustomer,
    layout: "/admin"
  },
  {
    path: "/listManufacturers",
    name: "List Manufacturers",
    icon: "ni ni-bullet-list-67 text-red",
    component: ListManufacturer,
    layout: "/admin"
  },
  {
    path: "/listVehicles",
    name: "List Vehicles",
    icon: "ni ni-bullet-list-67 text-red",
    component: ListVehicles,
    layout: "/admin"
  }
];
export default AdminRoute;
