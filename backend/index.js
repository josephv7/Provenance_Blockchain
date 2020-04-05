const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const customerController = require("./controllers/customer");
const manufacturerController = require("./controllers/manufacturer");
const vehicleController = require("./controllers/vehicle");
const transactionController = require("./controllers/transactions");
const queryController = require("./controllers/query");
const authController = require("./controllers/auth");
const dealerController = require("./controllers/dealer");

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    console.log("Basic GET API");
    res.send("Basic GET API");
});

app.get('/createCustomer', function (req, res) {
    return customerController.createCustomer(req, res);
});

app.get('/createManufacturer', function (req, res) {
    return manufacturerController.createManufacturer(req, res);
});

app.get('/createDealer', function (req, res) {
    return dealerController.createDealer(req, res);
});

app.post('/api/userLogin', function (req, res) {
    return authController.userLogin(req, res);
});

app.get('/createVehicle', function (req, res) {
    return vehicleController.createVehicle(req, res);
});

app.get('/listVehicles', function (req, res) {
    return vehicleController.listVehicles(req, res);
});

app.get('/listCustomers', function (req, res) {
    return customerController.listCustomers(req, res);
});

app.get('/listManufacturers', function (req, res) {
    return manufacturerController.listManufacturers(req, res);
});

app.get('/listDealers', function (req, res) {
    return dealerController.listDealers(req, res);
});

app.get('/ownerChange', function (req, res) {
    return transactionController.ownerChange(req, res);
});

app.get('/getVehicleTransactions', function (req, res) {
    return queryController.getVehicleTransactions(req, res);
});

app.get('/listUserVehicles', function (req, res) {
    return queryController.listUserVehicles(req, res);
});

app.get('/listManufacturervehicles', function (req, res) {
    return queryController.listManufacturerVehicles(req, res);
});

app.get('/listDealerVehicles', function (req, res) {
    return queryController.listDealerVehicles(req, res);
})

app.get('/vehichleInfo', function (req, res) {
    vehicleController.vehicleInfo(req, res);
});

app.get('/getCustomerInfo', function (req, res) {
    customerController.getCustomerInfo(req, res);
});

app.get('/getManufacturerInfo', function (req, res) {
    manufacturerController.getManufacturerInfo(req, res);
});


let server = app.listen(4000, function () {
    console.log('Server is listening on port 4000')
});
