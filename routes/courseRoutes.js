const express = require("express")
const {createCourse, getAllCourse, deleteCoursesById, getCourseById, updateCourseById} = require("../controller/courseController")
const verifyToken = require("../middlewer/authMiddlwer")
const course = express.Router()

 course.post("/create", verifyToken , createCourse)
 course.get("/get/all", getAllCourse)
 course.delete('/courses/:id', verifyToken, deleteCoursesById);
 course.get('/courses/:id',  getCourseById);
 course.put('/courses/:id',verifyToken,  updateCourseById);


module.exports = course