const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ID: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    name:{
        type: String,
        min: 3,
        max: 100,
        required: true
    },
    age: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    }
});

module.exports = mongoose.model("user", userSchema);