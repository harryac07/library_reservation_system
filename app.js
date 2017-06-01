require('dotenv').load();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
require('./app-api/models/db'); // requiring db file
var routesApi = require('./app-api/routes/index'); // api routes to be built
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/api',routesApi); //to be built

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.use((req, res, next)=>{
    // console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.listen(3000,()=>{
	console.log("Express app running on port 3000");
});

module.exports = app;

//    "prestart": "webpack",
    // "start": "nodemon app "