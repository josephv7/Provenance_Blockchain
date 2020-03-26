const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constansts");

module.exports = {
    userLogin: (req, res) => {

        var userId = req.body.userId;
        var password = req.body.password;
        var userType = req.body.userType;
        var url;


        if (userType == "customer") {
            url = constants.blockchainBaseURL + 'Customer/' + userId.toString();
        } else if (userType == "manufacturer") {
            url = constanst.blockchainBaseURL + 'Manufacturer/' + userId.toString();
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

    }
};