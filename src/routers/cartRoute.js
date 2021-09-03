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
        const count = req.body.count;
        const id = req.body.id;
        const isexist = await Cart.find({ id })
        const update = await Cart.findOneAndUpdate({ id }, { count: isexist[0].count + count })
        res.send(update);
    }
    catch (err) {
        console.log(err.message)
        const cart = new Cart(req.body);
        const createCart = await cart.save();
        res.status(201).send(createCart);
    }
});
cartRouter.get("/all", async (req, res) => {
    try {
        const cartData = await Cart.find();
        res.send(cartData);
    }
    catch (e) {
        res.send(e);
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

cartRouter.delete("/carts/:id", async (req, res) => {
    try {
        console.log(req.params.id, "id")
        const deleteCart = await Cart.findOneAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send()
        }
        res.send(deleteCart);
    } catch (error) {
        res.status(500).send(error)
    }
});

cartRouter.patch("/carts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCart = await Cart.findOneAndUpdate({ id }, { count: req.params.count + 1 },
            { new: true });
        res.send(updatedCart);
    } catch (error) {
        res.status(400).send(error)
    }
})


cartRouter.get("/carts/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const cartData = await Cart.find({ id });
        //console.log(id)
        res.send(cartData);
        if (!cartData) {
            return res.status(404).send();
        }
        else {
            res.send(cartData);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = cartRouter;