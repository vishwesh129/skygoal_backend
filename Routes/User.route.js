const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../Models/UserModel');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { firstName, lastName, email, mobile_no, password, city } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    const new_user = new UserModel({
        firstName,
        lastName,
        email,
        mobile_no,
        password: hash,
        city
    })
    await new_user.save();
    res.json({"msg":"Signup successful!"});
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email })

    if (!user) {
        res.json({"msg" : "Please SignUp!"})
    }

    const hash = user.password
    const correct_password = bcrypt.compareSync(password, hash);

    if (correct_password) {
        var token = jwt.sign({ userID: user._id }, process.env.JWT);
        res.json({ "msg": "Login successful!", "token": token })
    }
    else {
        res.json({"msg":"Invalid password"})
    }
})


module.exports = userRouter;