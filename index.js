const express = require('express');
const app=express();
const port=8000;

const db = require('./config/postgres');

//any request will go to the routes
app.use('/', require('./routes'));

//express app listening on port
app.listen(port, (err)=>{
    if(err) console.log("Error in running server: ", err);
    console.log("Server running on port: ", port);
})