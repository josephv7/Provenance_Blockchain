const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constansts");

module.exports = {
    createVehicle: (req, res) => {


        console.log(req.query.chassisNumber);
        console.log(req.query.ownerId);
        console.log(req.query.manufacturerLocation);
        console.log(req.query.manufacturer);
        console.log(req.query.plateNumber);


        var owner = "org.example.mynetwork.Customer#" + req.query.ownerId;


        Request.post({
            "headers": {"content-type": "application/json"},
            "url": constants.blockchainBaseURL + "Vehicle",
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


    },

    listVehicles: (req, res) => {
        axios.get(constants.blockchainBaseURL + 'Vehicle').then(function (response) {
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

    },

    vehicleInfo: (req, res) => {
        var chassisNumber = req.query.chassisNumber;

        var requestUrl = constants.blockchainBaseURL + "Vehicle/" + chassisNumber;

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


    }
};