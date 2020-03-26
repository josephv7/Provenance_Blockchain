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

app.get('/test', (req, res) => {

    // return customerController.createCustomer(req,res);

});

app.get('/createCustomer', function (req, res) {
    return customerController.createCustomer(req, res);
});


app.get('/createManufacturer', function (req, res) {
    return manufacturerController.createManufacturer(req,res);
});


app.post('/api/userLogin', function (req, res) {

    var userId = req.body.userId;
    var password = req.body.password;
    var userType = req.body.userType;
    var url;


    if (userType == "customer") {
        url = blockchainBaseURL + 'Customer/' + userId.toString();
    } else if (userType == "manufacturer") {
        url = blockchainBaseURL + 'Manufacturer/' + userId.toString();
    }


    axios.get(url).then(function (response) {
        // console.log(response.data);
        jsonResponse = response.data;


    }).then(function (response) {
        var response2 = jsonResponse;
        checkPassword(response2)
    }).catch(function (error) {
        console.log(error);
        // send invalid id message here
        res.end(JSON.stringify({status: "error"}));
    });


    function checkPassword(response) {
        //   console.log(response);
        console.log(response.password);
        console.log('inside check');

        if (SHA256(password) == response.password) {
            res.end(JSON.stringify([{status: "ok"}]));
            console.log('here');
        } else {
            res.end(JSON.stringify([{status: "incorrect"}]));
        }


    }


});


app.get('/createVehicle', function (req, res) {


    console.log(req.query.chassisNumber);
    console.log(req.query.ownerId);
    console.log(req.query.manufacturerLocation);
    console.log(req.query.manufacturer);
    console.log(req.query.plateNumber);


    var owner = "org.example.mynetwork.Customer#" + req.query.ownerId;


    Request.post({
        "headers": {"content-type": "application/json"},
        "url": blockchainBaseURL + "Vehicle",
        "body": JSON.stringify({
            "chassisNumber": req.query.chassisNumber,
            "owner": owner,
            "plateNumber": req.query.plateNumber,
            "manufactureLocation": req.query.manufacturerLocation,
            "manufacturer": req.query.manufacturer,
            "ownerList": [req.query.ownerId],
            "ownerId": req.query.ownerId

        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
        res.end(JSON.stringify({status: "ok"}));
    });


});


app.get('/listVehicles', function (req, res) {


    axios.get(blockchainBaseURL + 'Vehicle').then(function (response) {
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


app.get('/listCustomers', function (req, res) {
    return customerController.listCustomers(req,res);
});


app.get('/listManufacturers', function (req, res) {
    return manufacturerController.listManufacturers(req,res);
});


app.get('/ownerChange', function (req, res) {

    console.log(req.query.chassisNumber);
    var newOwnerId = req.query.newOwnerId;
    console.log(newOwnerId);


    var asset = 'org.example.mynetwork.Vehicle#' + req.query.chassisNumber;

    Request.post({
        "headers": {"content-type": "application/json"},
        "url": blockchainBaseURL + "AssetTransfer",
        "body": JSON.stringify({
            "asset": asset,
            "newOwnerId": newOwnerId,
            "newOwnerList": [newOwnerId]
        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
        res.end(JSON.stringify([{status: "ok"}]));
    });

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