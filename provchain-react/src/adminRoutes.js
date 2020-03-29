
import Index from "views/Index.js";
import CreateConsumer from "views/createConsumer";
import createManufactrer from "views/createManufacturer";
import Tables from "views/Tables.js";
import Login from "views/Login"
import CreateManufacturer from "views/createManufacturer";

var AdminRoute = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
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
    path: "/listConsumers",
    name: "List Consumers",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/listManufacturers",
    name: "List Manufacturers",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/listVehicles",
    name: "List Vehicles",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/ownerChange",
    name: "Owner Change",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  }
];
export default AdminRoute;
