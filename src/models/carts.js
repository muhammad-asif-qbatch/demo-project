const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id: {
        type: String
    }
});

// Now, we will create a new collection

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;