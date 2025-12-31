const mongoose = require('mongoose');
require('dotenv').config();

exports.conect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database Connected Succesfully"))
    .catch((err) => {
        console.log("Database Connection Failed");
        console.error(err);
        process.exit(1);
    })
};