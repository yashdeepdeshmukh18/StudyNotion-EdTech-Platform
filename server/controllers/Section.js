const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res) => {
    try{
        // data fetch
        const { sectionName, courseId } = req.body;

        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course with section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { courseContent: newSection._id }
            },
            { new: true }
        );

        // HW : use populate to fetch updated course details with sections and subsections

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        });



    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to create section",
            error: err.message
        });
    }
}


exports.updateSection = async (req, res) => {
    try{
        // data fetch
        const {sectionName, sectionId } = req.body;

        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        // update section
        await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Section updated successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to update section",
            error: err.message
        });
    }
}



exports.deleteSection = async (req, res) => {
    try{
        // data fetch - assuming sectionId is sent in params
        const { sectionId } = req.body;

        // delete section
        await Section.findByIdAndDelete(sectionId);

        // Todo[testing] : is there need to remove the sectionId from the corresponding course's sections array?
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete section",
            error: err.message
        });
    }
}




