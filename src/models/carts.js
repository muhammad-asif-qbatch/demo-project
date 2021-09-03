const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id: {
        type: String
    },
    count: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    }
});

// Now, we will create a new collection

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;