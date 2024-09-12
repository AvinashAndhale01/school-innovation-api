const Course = require('../modal/courseModal'); 

exports.createCourse = async (req, res) => {
    try {
        const { title, about, img, price, guide, curriculum, paymentUrl, duration, aboutCourse } = req.body;

        
        if (!title || !about || !img || !price || !guide || !curriculum) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newCourse = new Course({
            title,
            about,
            img,
            price,
            guide,
            curriculum,
            paymentUrl,
            duration,
            aboutCourse
        });

        await newCourse.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course: newCourse
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


exports.getAllCourse = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const size = parseInt(req.query.size, 10) || 10;

  
        if (page < 1 || size < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page and size must be positive integers'
            });
        }

        const skip = (page - 1) * size;
        const limit = size;

        const totalCount = await Course.countDocuments();

        const courses = await Course.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: 'Courses retrieved successfully',
            totalCount,
            courses
        });
    } catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};



exports.deleteCoursesById = async (req, res) => {
    try {
        // Extract the course ID from request parameters
        const { id } = req.params;

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Course ID is required'
            });
        }

        // Find and delete the course by ID
        const result = await Course.findByIdAndDelete(id);

        // Check if the course was found and deleted
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Send a success response
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


exports.getCourseById = async (req, res) => {
    try {
        // Extract the course ID from request parameters
        const { id } = req.params;

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Course ID is required'
            });
        }

        // Find the course by ID
        const course = await Course.findById(id);

        // Check if the course was found
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Send a success response with the course data
        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        console.error('Error retrieving course:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};



exports.updateCourseById = async (req, res) => {
    try {
        // Extract the course ID from request parameters and update data from request body
        const { id } = req.params;
        const updateData = req.body;

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Course ID is required'
            });
        }

        // Find and update the course by ID
        const course = await Course.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        // Check if the course was found and updated
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Send a success response with the updated course data
        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
