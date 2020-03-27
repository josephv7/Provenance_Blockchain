const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constansts");

module.exports = {
    listUserVehicles: (req, res) => {

        var userType = req.query.userType;
        console.log(userType);

        var userId = req.query.userId;
        console.log(userId);

        var requestUrl;

        if (req.query.userType == "customer") {

            var customerAsset = "resource%3Aorg.example.mynetwork.Customer%23" + userId;
            console.log('customer');
            requestUrl = constants.blockchainBaseURL + "queries/ListUserVehichles?id=" + customerAsset;
        } else {

            var manufacturerAsset = "resource%3Aorg.example.mynetwork.Manufacturer%23" + userId;
            console.log('manufcaturer');
            requestUrl = constants.blockchainBaseURL + "queries/ListUserVehichles?id=" + manufacturerAsset;

        }


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
    },

    getVehicleTransactions: (req, res) => {
        console.log(req.query.chassisNumber);

        var vehichleAsset = "resource%3Aorg.example.mynetwork.Vehicle%23" + req.query.chassisNumber;
        var queryUrl = constants.blockchainBaseURL + "queries/ListVehichleTransactions?id=" + vehichleAsset;

        axios.get(queryUrl).then(function (response) {
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