/*
=======================================================
  Title: app.js
  Author: Professor Krasso
  Date: 06/02/2021
  Modified by: Sarah Jean Baptiste
  Description: Assignment-1.2
========================================================
*/

// Requirement statements. 
var express = require('express');
var http = require('http');
var swaggerUIExpress = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var mongoose = require("mongoose");

var myRoutes = require('./routes/jeanBaptiste-composer-routes.js')

// Link to mongoDB. 
var mongoDB = "mongodb+srv://admin:5975@buwebdev-cluster-1.levpe.mongodb.net/web420DB?authSource=admin&replicaSet=atlas-sc0j04-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

// Mongoose connection. 
mongoose.connect(mongoDB, {
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));

db.once("open", function() {
    console.log("Application connected to MongoDB instance");
});

//Variable to express library. 
var app = express();

//Set the port.
app.set("port", process.env.PORT || 3000)

//Set app to use express.json
app.use(express.json());

//Set app to use express.urlencoded
app.use(express.urlencoded({extended: true}));

app.use('/api', myRoutes)

//Define options with properties/values. 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0', 
        },
    }, 
    apis: ['./routes/*.js'], //files containing annotations for openAPI specifications. 
};

const openAPISpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(openAPISpecification));

//Create server and listen on port 3000.
http.createServer(app).listen(app.get("port"), function() {
    console.log('Application started and listening on port %s', + app.get("port"))
});