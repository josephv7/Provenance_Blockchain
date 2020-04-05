const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");

module.exports = {
    createManufacturer: (req, res) => {

        console.log(req.query.manufacturerName);
        console.log(req.query.password);
        console.log(req.query.mainAddress);
        console.log(req.query.locations);
        //pass locations as a string array


        var count;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        axios.get(constants.blockchainBaseURL + "Manufacturer").then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;


        }).then(function (response) {
            findManufacturerCount();
        }).catch(function (error) {
            console.log(error);
            res.end(JSON.stringify({status: "error"}));
        });

        function findManufacturerCount() {

            count = 3001 + jsonResponse.length;

            Request.post({
                "headers": {"content-type": "application/json"},
                "url": constants.blockchainBaseURL + "Manufacturer",
                "body": JSON.stringify({
                    "manufacturerName": req.query.manufacturerName,
                    "participantId": count.toString(),
                    "participantType": "manufacturer",
                    "password": SHA256(req.query.password).toString(),
                    "mainAddress": req.query.mainAddress,
                    "locations": req.query.locations

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


    },

    listManufacturers: (req, res) => {
        axios.get(constants.blockchainBaseURL + 'Manufacturer').then(function (response) {
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
    getManufacturerInfo : (req,res)=>{

        axios.get(constants.blockchainBaseURL + 'Manufacturer/' + req.query.id)
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
