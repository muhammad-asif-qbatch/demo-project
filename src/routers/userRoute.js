const express = require('express');
const User = (require('../models/users'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRouter = new express.Router();
userRouter.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = userRouter;