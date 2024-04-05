require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");

//fetch db from postgres
const db = require("./config/postgres");
//fetch aws s3
const s3 = require("./config/awsS3");

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//any request will go to the routes
app.use("/", require("./routes"));


//express app listening on port 8000
app.listen(port, (err) => {
  if (err) console.log("Error in running server: ", err);
  console.log("Server running on port: ", port);
});
