const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");

module.exports = {
    listUserVehicles: (req, res) => {

        // var userType = req.query.userType;
        // console.log(userType);

        var userId = req.query.userId;
        console.log(userId);


        var customerAsset = "resource%3Aorg.example.mynetwork.Customer%23" + userId;
        console.log('customer');
        var requestUrl = constants.blockchainBaseURL + "queries/ListUserVehichles?id=" + customerAsset;

        // else if(userId.charAt(0) == "3"){
        //
        //     var manufacturerAsset = "resource%3Aorg.example.mynetwork.Manufacturer%23" + userId;
        //     console.log('manufcaturer');
        //     requestUrl = constants.blockchainBaseURL + "queries/ListUserVehichles?id=" + manufacturerAsset;
        //
        // }


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

    },
    listManufacturerVehicles: (req, res) => {

        var manufacturerId = req.query.manufacturerId;
        console.log(manufacturerId);

        var requestUrl = constants.blockchainBaseURL + 'queries/ListManufacturerVehicles?id=' + manufacturerId;


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
    listDealerVehicles: (req, res) => {
        axios.get(constants.blockchainBaseURL + 'queries/ListDealerVehicles', {
            params: {
                id: req.query.dealerId
            }
        }).then(function (response) {
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
    listUnverifiedVehicles : (req,res) => {
        axios.get(constants.blockchainBaseURL + 'queries/ListUnverifiedVehicles', {
            params: {
                id: req.query.dealerId
            }
        }).then(function (response) {
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
