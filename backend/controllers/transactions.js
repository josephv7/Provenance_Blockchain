const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");

module.exports = {
    ownerChange: (req, res) => {
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
                res.end(JSON.stringify({status: "error"}));
                return console.dir(error);
            } else {
                if(JSON.parse(body).hasOwnProperty('error')){
                    res.end(JSON.stringify({status: "error"}));
                }else {
                    console.dir(JSON.parse(body));
                    res.end(JSON.stringify({status: "ok"}));
                }
            }
        });

    },
    dealerUpdation : (req,res) => {
        console.log(req.query.dealerName);
        console.log(req.query.dealerId);
        console.log(req.query.chassisNumber);

        //TODO fetch dealerName using dealerId here

        var asset = 'org.example.mynetwork.Vehicle#' + req.query.chassisNumber;

        Request.post({
            "headers": {"content-type": "application/json"},
            "url": constants.blockchainBaseURL + "DealerUpdation",
            "body": JSON.stringify({
                "asset": asset,
                "newDealerName": req.query.dealerName,
                "newDealerId": req.query.dealerId
            })
        }, (error, response, body) => {
            if (error) {
                res.end(JSON.stringify({status: "error"}));
                return console.dir(error);
            } else {
                if(JSON.parse(body).hasOwnProperty('error')){
                    res.end(JSON.stringify({status: "error"}));
                }else {
                    console.dir(JSON.parse(body));
                    res.end(JSON.stringify({status: "ok"}));
                }
            }
        });

    },
    ownerChnangeRequest : (req,res) => {

        console.log(req.query.chassisNumber);
        var newOwnerId = req.query.newOwnerId;
        console.log(newOwnerId);
        console.log(plateNumber)

        var asset = 'org.example.mynetwork.Vehicle#' + req.query.chassisNumber;

        Request.post({
            "headers": {"content-type": "application/json"},
            "url": constants.blockchainBaseURL + "AssetTransferRequest",
            "body": JSON.stringify({
                "asset": asset,
                "futureOwner": newOwnerId,
                "futurePlateNumber" : plateNumber
            })
        }, (error, response, body) => {
            if (error) {
                res.end(JSON.stringify({status: "error"}));
                return console.dir(error);
            } else {
                if(JSON.parse(body).hasOwnProperty('error')){
                    res.end(JSON.stringify({status: "error"}));
                }else {
                    console.dir(JSON.parse(body));
                    res.end(JSON.stringify({status: "ok"}));
                }
            }
        });



    }
};
