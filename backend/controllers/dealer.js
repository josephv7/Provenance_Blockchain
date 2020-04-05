const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");

module.exports = {
    createDealer: (req, res) => {
        console.log(req.query.dealerName);
        console.log(req.query.password);
        console.log(req.query.address);
        cosnole.log(req.query.manufacturerId);


        var count;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        axios.get(constants.blockchainBaseURL + "Dealer").then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;


        }).then(function (response) {
            findDealerCount();
        }).catch(function (error) {
            console.log(error);
            res.end(JSON.stringify({status: "error"}));
        });

        function findDealerCount() {

            count = 4001 + jsonResponse.length;

            Request.post({
                "headers": {"content-type": "application/json"},
                "url": constants.blockchainBaseURL + "Dealer",
                "body": JSON.stringify({
                    "dealerName": req.query.dealerName,
                    "participantId": count.toString(),
                    "participantType": "dealer",
                    "address": req.query.address,
                    "password": SHA256(req.query.password).toString(),
                    "manufacturerId": req.query.manufacturerId

                })
            }, (error, response, body) => {
                if (error) {
                    res.end(JSON.stringify({status: "error"}));
                    return console.dir(error);
                } else {

                    if (JSON.parse(body).hasOwnProperty('error')) {
                        res.end(JSON.stringify({status: "error"}));
                    } else {
                        // client.messages.create({
                        //     body: 'Hey ' + req.query.customerName + '! Your password is ' + req.query.password,
                        //     from: 'whatsapp:+14155238886',
                        //     to: 'whatsapp:+919496710560'
                        // })
                        //     .then(message => console.log(message.sid))
                        //     .done();

                        console.dir(JSON.parse(body));
                        res.end(JSON.stringify({status: "ok"}));
                    }

                }


            });

        }


    },

    listDealers : (req,res) => {

        axios.get(constants.blockchainBaseURL + 'Dealer').then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;

        }).then(function (response) {
            showData();
        }).catch(function (error) {
            console.log(error);
            res.end(JSON.stringify({status: "error"}));

        });


        function showData() {
            console.log(jsonResponse);
            res.send(jsonResponse);
        }
    }
};
