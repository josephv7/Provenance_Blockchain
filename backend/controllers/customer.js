const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");
const cmd=require('node-cmd');
const openssl = require('openssl-nodejs')


const config = require("../config");
const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    createCustomer: (req, res) => {

        console.log(req.query.customerName);
        console.log(req.query.password);
        console.log(req.query.address);

        var count;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        axios.get(constants.blockchainBaseURL + "Customer").then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;


        }).then(function (response) {
            findCustomerCount();
        }).catch(function (error) {
            console.log(error);
            res.end(JSON.stringify({status: "error"}));
        });

        function findCustomerCount() {

            count = 2001 + jsonResponse.length;

            Request.post({
                "headers": {"content-type": "application/json"},
                "url": constants.blockchainBaseURL + "Customer",
                "body": JSON.stringify({
                    "customerName": req.query.customerName,
                    "participantId": count.toString(),
                    "participantType": "user",
                    "address" : req.query.address,
                    "password": SHA256(req.query.password).toString()

                })
            }, (error, response, body) => {
                if (error) {
                    res.end(JSON.stringify({status: "error"}));
                    return console.dir(error);
                } else {

                    if(JSON.parse(body).hasOwnProperty('error')){
                        res.end(JSON.stringify({status: "error"}));
                    }else {
                        client.messages.create({
                            body: 'Hey ' + req.query.customerName + '! Your password is ' + req.query.password,
                            from: 'whatsapp:+14155238886',
                            to: 'whatsapp:+919496710560'
                        })
                            .then(message => console.log(message.sid))
                            .done();

                        console.dir(JSON.parse(body));
                        res.end(JSON.stringify({status: "ok"}));
                    }

                }


            });

        }

    },

    listCustomers: (req, res) => {

        axios.get(constants.blockchainBaseURL + 'Customer').then(function (response) {
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

    },
    getCustomerInfo : (req,res) => {

        //TODO check if starting with 2, else send error response
        axios.get(constants.blockchainBaseURL + 'Customer/' + req.query.id)
            .then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;

        }).then(function (response) {
            showData();
        }).catch(function (error) {
            console.log(error);
            console.log('hi');
            res.end(JSON.stringify({status: "error"}));

        });

        //TODO check if not present error in response from blockchain and send corresponding reponse to frontend
        function showData() {
            // console.log(jsonResponse);
            res.send(jsonResponse);
        }

    }
};
