const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const Request = require("request");
const axios = require('axios');
const cors = require('cors');
const SHA256 = require("crypto-js/sha256");


const customerController = require("./controllers/customer");
const manufacturerController = require("./controllers/manufacturer");
const vehicleController = require("./controllers/vehicle");
const transactionController = require("./controllers/transactions");


const config = require("./config");
const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);


let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

var blockchainBaseURL = "http://localhost:3000/api/";

app.get('/', function (req, res) {

    console.log("Basic GET API");
    res.send("Basic GET API");

});

app.get('/createCustomer', function (req, res) {
    return customerController.createCustomer(req, res);
});


app.get('/createManufacturer', function (req, res) {
    return manufacturerController.createManufacturer(req,res);
});


app.post('/api/userLogin', function (req, res) {


});


app.get('/createVehicle', function (req, res) {
    return vehicleController.createVehicle(req,res);
});


app.get('/listVehicles', function (req, res) {
    return vehicleController.listVehicles(req,res);
});


app.get('/listCustomers', function (req, res) {
    return customerController.listCustomers(req,res);
});


app.get('/listManufacturers', function (req, res) {
    return manufacturerController.listManufacturers(req,res);
});


app.get('/ownerChange', function (req, res) {
    return transactionController.ownerChange(req,res);
});

app.get('/getVehicleTransactions', function (req, res) {

    console.log(req.query.chassisNumber);

    var vehichleAsset = "resource%3Aorg.example.mynetwork.Vehicle%23" + req.query.chassisNumber;
    var queryUrl = blockchainBaseURL + "queries/ListVehichleTransactions?id=" + vehichleAsset;

    axios.get(queryUrl).then(function (response) {
        console.log(response.data);
        jsonResponse = response.data;

    }).then(function (response) {
        showData();
    }).catch(function (error) {
        console.log(error);
    });


    function showData() {
        console.log(jsonResponse);
        res.send(jsonResponse);
    }


});


app.get('/listUserVehicles', function (req, res) {

    var userType = req.query.userType;
    console.log(userType);

    var userId = req.query.userId;
    console.log(userId);

    var requestUrl;

    if (req.query.userType == "customer") {

        var customerAsset = "resource%3Aorg.example.mynetwork.Customer%23" + userId;
        console.log('customer');
        requestUrl = blockchainBaseURL + "queries/ListUserVehichles?id=" + customerAsset;
    } else {

        var manufacturerAsset = "resource%3Aorg.example.mynetwork.Manufacturer%23" + userId;
        console.log('manufcaturer');
        requestUrl = blockchainBaseURL + "queries/ListUserVehichles?id=" + manufacturerAsset;

    }


    axios.get(requestUrl).then(function (response) {
        console.log(response.data);
        jsonResponse = response.data;

    }).then(function (response) {
        showData();
    }).catch(function (error) {
        console.log(error);
    });

    function showData() {
        console.log(jsonResponse);
        res.send(jsonResponse);
    }

});

app.get('/vehichleInfo', function (req, res) {

    var chassisNumber = req.query.chassisNumber;

    var requestUrl = blockchainBaseURL + "Vehicle/" + chassisNumber;

    axios.get(requestUrl).then(function (response) {
        console.log(response.data);
        jsonResponse = response.data;

    }).then(function (response) {
        showData();
    }).catch(function (error) {
        console.log(error);
    });

    function showData() {
        console.log(jsonResponse);
        res.send(jsonResponse);
    }


});


let server = app.listen(4000, function () {
    console.log('Server is listening on port 4000')
});