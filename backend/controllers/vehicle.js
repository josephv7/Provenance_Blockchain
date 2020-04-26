const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");
const openssl = require('openssl-nodejs')

module.exports = {
    createVehicle: (req, res) => {


        console.log(req.query.chassisNumber);
        // console.log(req.query.ownerId);
        console.log(req.query.manufacturerLocation);
        console.log(req.query.manufacturerName);
        // console.log(req.query.plateNumber);
        console.log(req.query.manufacturerId);
        // console.log(req.query.dealerName);
        // console.log(req.query.dealerId);


        openssl('openssl enc -aes-128-cbc -k secret -P -md sha1', function (err, buffer) {

                console.log(err.toString(), buffer.toString());
                aesKey = buffer.toString().substr(26, 32);
                console.log(aesKey);


                Request.post({
                    "headers": {"content-type": "application/json"},
                    "url": constants.blockchainBaseURL + "Vehicle",
                    "body": JSON.stringify({
                        "chassisNumber": req.query.chassisNumber,
                        "plateNumber": "_",
                        "manufactureLocation": req.query.manufacturerLocation,
                        "manufacturerName": req.query.manufacturerName,
                        "ownerList": [],
                        "ownerId": "_",
                        "manufacturerId": req.query.manufacturerId,
                        "dealerName": "_",
                        "dealerId": "_",
                        "futureOwner": "_",
                        "verified": "true",
                        "futurePlateNumber": "_",
                        "contentKey" : aesKey


                    })
                }, (error, response, body) => {
                    if (error) {
                        res.end(JSON.stringify({status: "error"}));
                        return console.dir(error);
                    } else {
                        //TODO handle vehicle already exists
                        if (JSON.parse(body).hasOwnProperty('error')) {
                            res.end(JSON.stringify({status: "error"}));
                        } else {
                            console.dir(JSON.parse(body));
                            res.end(JSON.stringify({status: "ok"}));
                        }

                    }

                });
        })


    },

    listVehicles: (req, res) => {
        axios.get(constants.blockchainBaseURL + 'Vehicle').then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;

        }).then(function (response) {
            showData();
        }).catch(function (error) {
            res.end(JSON.stringify({status: "error"}));
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
            res.end(JSON.stringify({status: "error"}));
            console.log(error);
        });

        function showData() {
            console.log(jsonResponse);
            res.send(jsonResponse);
        }


    }
};
