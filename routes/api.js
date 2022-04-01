const router = require("express").Router();
const user = require("../model/user.js");

router.get("/", async (req, res) => {
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
    const result = await user.
    res.send("Hello World!")
});

module.exports = router;