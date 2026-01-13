const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create a course ka handler function
exports.createCourse = async (req, res) => {
    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required to create a course",
            });
        }

        if (!status || status === undefined) {
			status = "Draft";
		}
        // check for instructor -> already verified in auth middleware but this is to bring details of instructor on ui
        const userId = req.user.id;

        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});
        console.log("Instruction Details: ", instructorDetails);
        // TODO: verify that userId and instructor._id is same or not

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        // check given tag is valid or not
        const CategoryDetails = await Category.findById(category);

        if(!CategoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details not found",
            });
        }

        // upload Image to cloudinary
        const thumbnailImageUploadResponse = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log(thumbnailImageUploadResponse);

        // create entry in db for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag: tag,
            Category: CategoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
			instructions: instructions,
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

        // update the Category ka schema
        // TODO : HM
        await Category.findByIdAndUpdate(
            {_id: CategoryDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true}
        );

        res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create courses",
            error: error.message,
        })
    }
}



// get all courses handler function

exports.showAllCourses = async (req, res) => {
    try{    
            // TODO: change the below stmt incrementally

            const allCourses = await Course.find({}).populate("instructor").exec();

            // {courseName:true,
            //                                             price:true,
            //                                             thumbnail:true,
            //                                             instructor:true,
            //                                             ratingAndReviews:true,
            //                                             studentsEnrolled:true,
            // }
            
            return res.status(200).json({
                success: true,
                message: "All courses fetched successfully",
                data:allCourses,
            })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch courses",
            error: error.message,
        })
    }
}

// getCourse Details
exports.getCourseDetails = async (req, res) => {
    try{
        // get id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.find(
            {_id:courseId} )
            .populate(
                {
                    path: "instructor",
                    populate:{
                        path:"additionalDetails"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndreviews")
            .populate({
                path:"courseContent",
                populate:{
                    path: "subSection", 
                }
            })
            .exec();
        
        // validation
        if(!courseDetails){
            return res.json(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched succesfully",
            data:courseDetails
        })
         
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


