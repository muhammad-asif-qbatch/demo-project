const express = require("express");
const Cart = require("../models/carts");
// 1. Create a new router
const cartRouter = new express.Router();
// 2. we need to define the router
cartRouter.get("/", (req, res) => {
    res.send("hello from the express")
})
// post request using async await
cartRouter.post("/carts", async (req, res) => {
    try {
        const cart = new Cart(req.body);
        const createCart = await cart.save();
        res.status(201).send(createCart)
    }
    catch (e) {
        res.status(400).send(e);
    }

});
/*
app.post("/students", (req, res) => {
    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
    //res.send("hello express from restapi.");
});*/
module.exports = cartRouter;