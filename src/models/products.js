const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    quantity: {
        type: String
    },
    image: {
        type: String
    }
});

// Now, we will create a new collection
const Product = new mongoose.model("Product", productSchema);
module.exports = Product;