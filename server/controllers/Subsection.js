const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubsection = async (req, res) => {
    try{
        // data fetch
        const {sectionId, title, timeDuration, description} = req.body;

        // extract file/video
        const video = req.files.videoFile;

        // data validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create subsection
        const SubsectionDetails = await Subsection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl : uploadDetails.secure_url
        });  

        // update section with subsection objectID
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subsections: SubsectionDetails._id } },
            { new: true }
        );

        // HW :log updated secion here, after adding populate query

        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to create subsection",
            error: err.message
        });
    }
}

// TODO: updateSubsection controller function

// TODO: deleteSubsection controller function


