const mongoose = require("mongoose");

const guideSchema = mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    identity: { type: String, required: true }
});

const curriculumSchema = mongoose.Schema({
    module: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});


const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    about: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    guide: [guideSchema], 
    curriculum: [curriculumSchema]
}, {
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
