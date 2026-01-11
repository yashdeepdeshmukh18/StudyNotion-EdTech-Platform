const mongoose = require("mongoose");

const categorySchema = new mongoose.schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});

// export the tag model
module.exports = mongoose.model("Category", categorySchema);
