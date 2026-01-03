const Tag = require("../models/tags");

// create a tag ka handler function

exports.createTag = async (req, res) => {
    try{
        // fetch data
        const {name, description} = req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required to create a tag",
            });
        }

        // create entry in db
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });

        console.log(tagDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create tag",
            
        });
    }
}


// get all tags handler function

exports.showAllTags = async (req, res) => {
    try{
        const allTags = await Tag.find({}, {name:true, description:true});

        res.status(200).json({
            success: true,
            message: "All tags returned succesfully",
            allTags,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create tag",
            
        });
    }
}