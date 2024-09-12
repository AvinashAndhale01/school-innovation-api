const path = require('path');

// Define MIME types in a lookup object
const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf'
};

// Function to convert file buffer to Data URI (base64)
exports.dataUri = (file) => {
    const extName = path.extname(file.originalname).toLowerCase();
    const base64 = file.buffer.toString('base64');

    // Get the MIME type from the lookup object or use a default
    const mimeType = mimeTypes[extName] || 'application/octet-stream';

    return `data:${mimeType};base64,${base64}`;
};

exports.extractBase64Content = (dataUri) => {
    // Split the Data URI into the MIME type and base64 part
    const [metadata, base64] = dataUri.split(';base64,');
    
    // Check if the base64 part is present
    if (!base64) {
        throw new Error('Invalid Data URI format');
    }
    
    return base64;
};
