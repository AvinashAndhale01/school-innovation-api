const { dataUri, extractBase64Content } = require("../utils/dataUri");
const {v2} = require('cloudinary');

exports.uploading = async (req, res) => {
    try {
      console.log('File received:', req.file);
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file sent' });
      }
  
      const file = req.file;
  
      const fileUri = dataUri(file);
      console.log('File URI:', fileUri);
  
      const base64Content = extractBase64Content(fileUri);
      console.log('Base64 Content:', base64Content);
  
      // Upload file to Cloudinary
      const fileRes = await v2.uploader.upload(`data:${fileUri.split(';')[0].substring(5)};base64,${base64Content}`, {
        folder: 'uploads'
      });
      console.log('Cloudinary Response:', fileRes);
  
      if (!fileRes) {
        return res.status(500).json({
          message: "File upload failed",
          success: false
        });
      }
  
      res.json({
        success: true,
        message: 'File uploaded successfully',
        file: {
          name: file.originalname,
          uri: fileRes.url,
          format: fileRes.format,
          size: fileRes.bytes
        }
      });
  
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message
      });
    }
  };
  