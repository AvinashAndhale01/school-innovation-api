const express = require("express")
const verifyToken = require("../middlewer/authMiddlwer")
const {uploading} = require("../controller/uploadController")
const uploader = require("../middlewer/uploadMiddleware")

const upload = express.Router()

upload.post("/", verifyToken ,uploader.single('file'), uploading);



module.exports = upload