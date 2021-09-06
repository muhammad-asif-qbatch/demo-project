const express = require("express");
require("./db/conn");
const cors = require("cors");
const Product = require("./models/products.js");
const Cart = require("./models/carts.js");
const productRouter = require("./routers/productRoute.js");
const cartRouter = require("./routers/cartRoute.js");
const app = express();
const port = process.env.PORT || 3000;

// express.json to make the request body to in jason format
// In this file
app.use(cors());
app.use(express.json());
// We need to register our router
app.use('/product', require("./routers/productRoute.js"))
app.use('/cart', require("./routers/cartRoute.js"));

app.listen(port, () => {
    console.log(`Connection is setup at ${port}`)
});
//export default app;