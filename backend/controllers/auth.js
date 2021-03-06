const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");

module.exports = {
    userLogin: (req, res) => {

        var userId = req.body.userId;
        var password = req.body.password;
        var userType;
        var url;


        if (userId.charAt(0) == "2") {
            url = constants.blockchainBaseURL + 'Customer/' + userId.toString();
            userType = "customer";
            fetchDataFromBlockchain();
        } else if (userId.charAt(0) == "3") {
            url = constants.blockchainBaseURL + 'Manufacturer/' + userId.toString();
            userType = "manufacturer";
            fetchDataFromBlockchain()
        } else if (userId.charAt(0) == "4") {
            url = constants.blockchainBaseURL + 'Dealer/' + userId.toString();
            userType = "dealer";
            fetchDataFromBlockchain()
        } else if (userId == "admin") {
            userType = "admin";
            tempCheck();
        }

        function tempCheck() {
            if (req.body.userId == "admin" && req.body.password == "admin") {
                res.end(JSON.stringify([{status: "ok", userType: userType}]));
            } else {
                res.end(JSON.stringify([{status: "incorrect"}]));
            }
        }

        function fetchDataFromBlockchain() {
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
        }


        function checkPassword(response) {
            //   console.log(response);
            console.log(response.password);
            console.log('inside check');

            if (SHA256(password) == response.password) {
                res.end(JSON.stringify([{status: "ok", userType: userType}]));
                console.log('here');
            } else {
                res.end(JSON.stringify([{status: "incorrect"}]));
            }


        }

    }
};
