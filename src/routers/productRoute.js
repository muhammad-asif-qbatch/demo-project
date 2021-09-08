const express = require("express");
const Product = require("../models/products");
//const router = new express.Router();
const productRouter = new express.Router();
// 2. we need to define the router
productRouter.get("/asif", (req, res) => {
    res.send("Hello Buddy!")
})
// Default path
productRouter.get("/", (req, res) => {
    res.send("hello from the express")
})

// post request using async await
productRouter.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        const createProduct = await product.save();
        res.status(201).send(createProduct)
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

// get request
productRouter.get("/products", async (req, res) => {
    try {
        const productsData = await Product.find();
        res.send(productsData);
    }
    catch (e) {
        res.send(e);
    }
});
// get the individual student data using id
productRouter.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const productData = await Product.find({ id: id });
        //console.log(id)
        res.send(productData);
        if (!productData) {
            return res.status(404).send();
        }
        else {
            res.send(productData);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})
// delete the students by its id
productRouter.delete("/products/:id", async (req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send()
        }
        res.send(deleteStudent);
    } catch (error) {
        res.status(500).send(error)
    }
});


// update the students document using its id
productRouter.patch("/products/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate({ _id: _id }, req.body,
            { new: true });
        res.send(updatedStudent);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = productRouter;