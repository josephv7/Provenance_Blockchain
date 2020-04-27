const Request = require("request");
const axios = require('axios');
const SHA256 = require("crypto-js/sha256");
const constants = require("../constants");
const openssl = require('openssl-nodejs')
const CryptoJS = require("crypto-js");
const IPFS = require('ipfs');

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
                        "serviceRecord" : [],
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


    },
    createServiceRecord : (req,res) => {
        console.log(req.body.chassisNumber)
        console.log(req.body.dealerId)
        console.log(req.body.content)


        var requestUrl = constants.blockchainBaseURL + "Vehicle/" + req.body.chassisNumber;

        axios.get(requestUrl).then(function (response) {
            console.log(response.data);
            jsonResponse = response.data;

            vehicleKey = jsonResponse['contentKey'];

        }).then(function (response) {
            writeData()
        }).catch(function (error) {
            res.end(JSON.stringify({status: "error"}));
            console.log(error);
        });

        function writeData() {

            console.log(vehicleKey);



            const node = new IPFS()
            node.on('ready', async () => {
                console.log('iniside sample code')


                var date = new Date();
                var timeStampString = date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.txt';
                console.log('trial')
                console.log(timeStampString);

                const filesAdded = await node.add({
                    path: timeStampString,
                    content: Buffer.from(CryptoJS.AES.encrypt(req.body.content,vehicleKey).toString())
                })

                console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)

                fileHash = filesAdded[0].hash;
                console.log('After getting filehash')
                console.log(fileHash)
                // res.send(fileHash);
                try {
                    await node.stop()
                    console.log('Node stopped!')


                    var asset = 'org.example.mynetwork.Vehicle#' + req.body.chassisNumber;

                    Request.post({
                        "headers": {"content-type": "application/json"},
                        "url": constants.blockchainBaseURL + "RecordService",
                        "body": JSON.stringify({
                            "asset": asset,
                            "newServiceRecord" : [fileHash]
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


                    // Request.post({
                    //     "headers": { "content-type": "application/json" },
                    //     "url": "http://localhost:3000/api/MedicalRecord",
                    //     "body": JSON.stringify({
                    //         "recordId": calculatedId,
                    //         "owner" : ownerName,
                    //         "value" : [fileHash],
                    //         "doctorId" : [doctorname],
                    //         "verified" : 'false'
                    //     })
                    // }, (error, response, body) => {
                    //     if(error) {
                    //         return console.dir(error);
                    //     }
                    //
                    //
                    //     client.messages.create({
                    //         body: 'Record Created for patient' + username,
                    //         from: 'whatsapp:+14155238886',
                    //         to: 'whatsapp:+918289940688'
                    //     })
                    //         .then(message => console.log(message.sid))
                    //         .done();
                    //
                    //
                    //     console.dir(JSON.parse(body));
                    //     res.end(JSON.stringify([{ status: "ok" }]));
                    // });
                } catch (error) {
                    console.error('Node failed to stop cleanly!', error)
                }


            })



        }


    }
};
