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



let server = app.listen(4000, function() {
    console.log('Server is listening on port 4000')
});