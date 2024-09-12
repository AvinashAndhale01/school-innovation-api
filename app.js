const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const {v2} = require('cloudinary');

require('dotenv').config();
require('./database/connect')


const app = express()
const PORT = process.env.PORT || 3000

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET
  })

// For render react js in express server !
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/images", express.static(path.join(__dirname, "public/i    mages")));
app.use('/api/v1/admin',require('./routes/authRoutes'))
app.use('/api/v1/course',require('./routes/courseRoutes'))
app.use('/api/v1/upload', require('./routes/uploadRoutes'))

app.listen(PORT, () => {
    console.log(`Server is Started ! ${PORT}`)
})
