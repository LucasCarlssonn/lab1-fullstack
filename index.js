const express = require("express");
const mongoose = require("mongoose");
const user = require("./model/user");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();


mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true}, () =>{
    console.log("Connected to the database");
});



app.get("/", (req, res) => {
    // const newUser = new user({
    //     ID: "2", 
    //     firstName: "Lucas", 
    //     lastName: "Carlsson"});

    // newUser.save()
    // .then(()=> {
    //     console.log("user created");
    // })
    // .catch(() => {
    //     console.log("error");
    // })
    res.send("Hello World!")
});


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});