const mongoose = require('mongoose');

const profileSchema = new mongoose.schema({
    gender: {
        type: String
    },
    dateOfBirth: {
        type:String,
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type:String,
        trim: true,
    }
})


module.exports = mongoose.model("Profile", profileSchema);

