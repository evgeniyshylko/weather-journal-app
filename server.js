// Setup empty JS object to act as endpoint for all routes
projectData = {
    records: []
};



// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

app.get('/all', function (req, res) {
    res.send(projectData);
});

app.post('/add', callBack);

function callBack(req,res){
  res.send('POST received');
};

// POST weather record
const data = [];

app.post('/record', addRecord);

function addRecord (req,res){
   record = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
   }
   projectData.records.push(record);
   res.send(projectData.records);    
};
