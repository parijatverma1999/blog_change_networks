require("dotenv").config();
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const fetchUser = require('../middlewares/fetchUser')

//ROUTE 1 - Create a user (SIGN UP)
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should be atleast 5 minimum characters').isLength({ min: 5 })
], async (req, res) => {
    let userVerify = true;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //check whether this user exists or not
    try {
        let user = await User.UserSchema.findOne({ email: req.body.email })
        if (user) {
            userVerify = false;
            return res.status(400).json({ userVerify, message: "Sorry, user already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(req.body.password, salt)

        user = await User.UserSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        let data = {
            user: user.id
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY)
        res.json({ userVerify, authToken })
    } catch (error) {
        console.log("Errr in createUser ", error)
        res.status(500).json("Internal Server Error")
    }

})

//ROUTE 2 - Login and Authenticate User
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let authVerify = true;
    //If there are errors, return Bad request and the eerors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.UserSchema.findOne({ email });
        if (!user) {
            authVerify = false
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        console.log(passwordCompare)
        if (!passwordCompare) {
            authVerify = false
            return res.status(400).json({ authVerify, error: "Please try to login with correct credentials" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)
        res.json({ authVerify, authToken })
    } catch (err) {
        console.log("Error in login", err)
        res.status(500).json("Internal Server Error")
    }
})

module.exports = router;