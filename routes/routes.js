const router = require("express").Router();
const user = require("../model/user.js");
const {validateUser} = require("../validation");

router.get("/", async (req, res) => {
    res.send("Hello World!")
});
router.get("/users", async (req, res) => {
    const users = await user.find();
    res.json(users);
});

router.get("/users/:id", async (req, res) =>{
    try {
        const foundUser = await user.findOne({ID: req.params.id})
        if (!foundUser){
            return res.status(404).json({error: "User doesn't exist"});
        }
        res.json(foundUser)
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
    }
});
router.post("/users", async (req, res) => {

    const {error} = validateUser(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message})
    }


    const users = await user.find();
    if(users.length == 0){
        largest = "0";
    } else {
        for (let user of users){
            var largest = user.ID
            if(user.ID > largest){
                largest = user.ID
            }
        }
        if (largest == "NaN"){
            largest = "0";
        }
    }
    const userID = parseInt(largest) + 1

    const existingUser = await user.findOne({ID: userID})
    if (existingUser){
        return res.status(409).json({error: "User already exists."})
    }    
    const newUser = new user({
        ID: userID,
        name: req.body.name,
        age: req.body.age
    });

    try {
        await newUser.save();
        const users = await user.find();
        res.status(201).json(users);
        console.log("User created");
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        const updateUser = await user.findOne({ID: req.params.id});

        if (!updateUser){
            return res.status(404).json({error: "User doesn't exist"})
        }
        if (req.body.name){
            updateUser.name = req.body.name
        }
        if (req.body.age){
            updateUser.age = req.body.age
        }
        await updateUser.save()
        res.send({success: `User with ID ${req.params.id} was updated`})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error})
    }
    
});
router.delete("/users/:id", async (req, res) => {
    try {
        const foundUser = await user.findOneAndDelete({ID: req.params.id})
        if (!foundUser){
            return res.status(404).json({error: "User doesn't exist"})
        }
        res.status(200).json({success: `User with ID ${req.params.id} was deleted`});
    } catch (error) {
        res.status(400).json({error: error})
    }
});

module.exports = router;