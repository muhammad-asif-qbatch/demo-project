const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/EcommerceStore",
//     {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false
//     }).then(() => {
//         console.log("connection is successful")
//     }).catch((err) => {
//         console.log("No connection")
//     })

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/EcommerceStore';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connection is successful")
}).catch((err) => {
    console.log("No connection")
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));