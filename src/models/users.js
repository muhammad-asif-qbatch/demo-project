const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    first_name: {
        type: String, default: null
    },
    last_name: {
        type: String, default: null
    },
    email: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
});
const User = new mongoose.model("User", userSchema);
module.exports = User;