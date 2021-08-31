const express = require("express");
require("./db/conn");
const Product = require("./models/products.js")
const productRouter = require("./routers/route.js")
const app = express();
const port = process.env.PORT || 3000;

// express.json to make the request body to in jason format
// In this file
app.use(express.json());
// We need to register our router
app.use(productRouter)

app.listen(port, () => {
    console.log(`Connection is setup at ${port}`)
});