
const path = require("path");

exports.uploading = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, size, filename } = req.file;
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/images/${filename}`;

    res.json({
        message: "File uploaded successfully",
        file: {
            originalname,
            size,
            path: imageUrl
        }
    });
};
