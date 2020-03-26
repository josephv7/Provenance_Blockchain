const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constansts");

module.exports = {
    ownerChange : (req,res) => {
        console.log(req.query.chassisNumber);
        var newOwnerId = req.query.newOwnerId;
        console.log(newOwnerId);


        var asset = 'org.example.mynetwork.Vehicle#' + req.query.chassisNumber;

        Request.post({
            "headers": {"content-type": "application/json"},
            "url": constants.blockchainBaseURL + "AssetTransfer",
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

    }
};