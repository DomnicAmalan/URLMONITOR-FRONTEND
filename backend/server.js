let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();

var port = process.env.PORT || 3000;

let apiRoutes = require("./routes/landing");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/api', apiRoutes);

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.listen(port, function () {
     console.log("Running Survery Sparrow Ping on port " + port);
});