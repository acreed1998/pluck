require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());


// function to catch get req from client login
app.get('/user/login', (req, res) => {
  console.log(req.body); // figure out what to pass down to helper function
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send(data) back to the client with status
  // catch errors
});

// function to catch get req from client zipcode view
app.get('/user/zipcode', (req, res) => {
  console.log(req.body);
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send data and status
  // catch errors
});

// function to catch post from client signup
app.post('/user/info', (req, res) => {
  console.log(req.body);
  // call helper function from db that saves info to db
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
