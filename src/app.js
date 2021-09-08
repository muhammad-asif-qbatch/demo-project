const express = require("express");
require("dotenv").config();
require("./db/conn").connect();
const cors = require("cors");
const app = express();
const auth = require("./middlewear/auth");
//const port = process.env.PORT || 3000;
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
// express.json to make the request body to in jason format
app.use(cors());
app.use(express.json());
// We need to register our router
app.use('/product', require("./routers/productRoute.js"));
app.use('/cart', require("./routers/cartRoute.js"));
app.use('/', require("./routers/userRoute.js"));

app.listen(port, () => {
    console.log(`Connection is setup at ${port}`)
});
module.exports = app;