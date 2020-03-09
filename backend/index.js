const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const Request = require("request");
const axios = require('axios');
const cors = require('cors')

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Vehichle 1000 Series
// Customer 2000 Series
// Manufacturer 3000 Series

app.get('/', function(req, res){

    console.log("Basic GET API");
    res.send("Basic GET API");


});

app.get('/createCustomer', function (req,res) {

    var count;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");



    axios.get('http://localhost:3000/api/Customer').then(function (response){
        console.log(response.data);
        jsonResponse = response.data;


    }).then(function (response){
        findCustomerCount();
    }).catch(function (error) {
        console.log(error);
    });

    function findCustomerCount(){

        count =  2001 + jsonResponse.length;

        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/Customer",
            "body": JSON.stringify({
                "customerName" : req.query.customerName,
                "participantId" : count.toString(),
                "participantType" : "user"

            })
        }, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));
            res.end(JSON.stringify({ status: "ok" }));
        });

    }

});


app.get('/listCustomers', function (req,res) {


    axios.get('http://localhost:3000/api/Customer').then(function (response){
        console.log(response.data);
        jsonResponse = response.data;

    }).then(function (response){
        showData();
    }).catch(function (error) {
        console.log(error);
    });


    function showData(){
        console.log(jsonResponse);
        res.send(jsonResponse);
    }

});


app.get('/listManufacturers', function (req,res) {


    axios.get('http://localhost:3000/api/Manufacturer').then(function (response){
        console.log(response.data);
        jsonResponse = response.data;

    }).then(function (response){
        showData();
    }).catch(function (error) {
        console.log(error);
    });


    function showData(){
        console.log(jsonResponse);
        res.send(jsonResponse);
    }

});

app.get('/listVehichles', function (req,res) {

    axios.get('http://localhost:3000/api/Vehichle').then(function (response){
        console.log(response.data);
        jsonResponse = response.data;

    }).then(function (response){
        showData();
    }).catch(function (error) {
        console.log(error);
    });


    function showData(){
        console.log(jsonResponse);
        res.send(jsonResponse);
    }

});

app.get('/createManufacturer', function (req,res) {


    var count;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    axios.get('http://localhost:3000/api/Manufacturer').then(function (response){
        console.log(response.data);
        jsonResponse = response.data;


    }).then(function (response){
        findManufacturerCount();
    }).catch(function (error) {
        console.log(error);
    });

    function findManufacturerCount() {

        count = 2001 + jsonResponse.length;

        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/Manufacturer",
            "body": JSON.stringify({
                "manufacturerName" : req.query.manufacturerName,
                "participantId" : count.toString(),
                "participantType" : "manufacturer"

            })
        }, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));
            res.end(JSON.stringify({ status: "ok" }));
        });

    }


});



let server = app.listen(4000, function() {
    console.log('Server is listening on port 4000')
});