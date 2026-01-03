const Course = require('../models/Course');
const Tag = require('../models/tags');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create a course ka handler function
exports.createCourse = async (req, res) => {
    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required to create a course",
            });
        }

        // check for instructor -> already verified in auth middleware but this is bring details of instructor on ui
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instruction Details: ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        // check given tag is valid or not
        const tagDetails = await Tag.findById(tag);

        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: "Tag Details not found",
            });
        }

        // upload Image to cloudinary
        const thumbnailImageUploadResponse = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create entry in db for new course
        const mewCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true}
        );

        // update the TAG ka schema
        // TODO : HM
        await Tag.findByIdAndUpdate(
            {_id: tagDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true}
        );


    }
    catch(error){

    }
}




