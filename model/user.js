const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("user", userSchema);