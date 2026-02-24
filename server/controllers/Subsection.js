const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubsection = async (req, res) => {
    try{
        // data fetch
        const {sectionId, title, description} = req.body;

        // extract file/video
        const video = req.files.video;

        // data validation
        if (!sectionId || !title || !description || !video) {
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
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl : uploadDetails.secure_url
        });  

        // update section with subsection objectID
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubsectionDetails._id } },
            { new: true }
        ).populate("subSection");

        // HW :log updated secion here, after adding populate query


        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            data: updatedSection,
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
 exports.updateSubsection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await Subsection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save();

      const updatedSection = await Section.findById(sectionId).populate( "subSection" )

  
      return res.json({
        success: true,
        data:updatedSection,
        message: "Sub Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

// TODO: deleteSubsection controller function
 exports.deleteSubsection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await Subsection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate( "subSection" )
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }


