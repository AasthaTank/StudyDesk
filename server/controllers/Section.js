const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //date validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //create section
        const newSection = await Section.create({sectionName});

        //upadate course with section objectID
        const updatedCourseDetails = await Course.findbyIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id,
                                                }
                                            },
                                            {new:true},
                                        )
        //use populate to replace section /subsection both in the updatedCourseDetails 
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //return response
        return res.status(200),json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
        });

    }
    catch(error){
        //handle errors
        return res.status(500),json({
            success:false,
            message:"Unable to create Section, please try again",
            erroe:error.message,
        });
    }
};


//update a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

//delete section
exports.deleteSection = async (req, res) => {
    try{
        //get ID - assuming that we are sending ID in params
        const {sectionId} = req.body; //req.params <- test

        //course update
        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        
        // (testing)TODO: do we need to delete the entry from the course schema ??
        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
};