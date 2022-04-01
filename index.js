const express = require("express");
const mongoose = require("mongoose");
const api = require("./routes/api.js");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();


mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true}, () =>{
    console.log("Connected to the database");
});
app.use(express.json());
app.use(express.static("public"))
app.use("/api", api);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});