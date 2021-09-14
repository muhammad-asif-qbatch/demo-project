const express = require("express");
const Cart = require("../models/carts");
const jwt = require("jsonwebtoken");
const auth = require("../middlewear/auth");
const config = process.env;
const cartRouter = new express.Router();
cartRouter.get("/", (req, res) => {
    res.send("hello from the express")
});
cartRouter.post("/carts", async (req, res) => {
    // console.log('Request: ', JSON.stringify(req.body, null, 2));
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        console.log(decoded);
        if (!decoded)
            throw new Error('Invalid Token');
        const { email } = decoded;
        console.log('Email : ', email);
        const count = req.body.count;
        const id = req.body.id;
        const user_id = email;
        const prevCart = await Cart.findOne({ id, user_id });
        console.log(prevCart);
        if (prevCart) {
            const update = await Cart.findOneAndUpdate({ id, user_id }, { count: prevCart.count + count })
            res.send(update);
        } else {
            const data = {
                id,
                count,
                name: req.body.name,
                price: req.body.price,
                user_id,
            };
            const cart = new Cart(data);
            const createdCart = await cart.save();
            res.status(201).send(createdCart);
        }
    } catch (err) {
        res.status(400).send(err);
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
    const id = req.params.id;
    if (!id) {
        return res.status(400).send()
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        console.log(decoded);
        if (!decoded) {
            throw new Error('Invalid Token');
        }
        const { email } = decoded;
        const deletedCart = await Cart.findOneAndDelete({ id, user_id: email });
        res.send(deletedCart);
    } catch (error) {
        res.status(500).send(error)
    }
});
cartRouter.patch("/carts/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send()
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        if (!decoded) {
            throw new Error('Invalid Token');
        }
        const { email } = decoded;
        const queryData = {
            id: id,
            user_id: email
        }
        const needsToUpdate = {
            count: req.body.count
        }
        const updatedCart = await Cart.findOneAndUpdate(queryData, needsToUpdate, { new: true });
        res.send(updatedCart);

    } catch (error) {
        res.status(400).send(error)
    }
})
// cartRouter.get("/carts/:id", async (req, res) => {
//     try {
//         const user_id = req.params.id;

//         const cartData = await Cart.find({ user_id });
//         //console.log(id)
//         res.send(cartData);
//         if (!cartData) {
//             return res.status(404).send();
//         }
//         else {
//             res.send(cartData);
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })
cartRouter.get("/list", auth, async (req, res) => {
    try {
        const email = req.user;
        const cartData = await Cart.find({ user_id: email });
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