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

app.get('/', function(req, res){

    console.log("Basic GET API");
    res.send("Basic GET API");


});

app.get('/createUser', function (req,res) {

    var count;
    count = 2;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
        // for(var i = 0; i < jsonResponse.length; i++) {
        //     delete jsonResponse[i]['password'];
        //     delete jsonResponse[i]['privateKey'];
        //     delete jsonResponse[i]['publicKey'];
        // }

        console.log(jsonResponse);
        res.send(jsonResponse);
    }



});



let server = app.listen(4000, function() {
    console.log('Server is listening on port 4000')
});