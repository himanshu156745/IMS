const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const { verifyMagicBytes } = require('../middlewares/multer.middleware');
const ApiError = require('./ApiError');

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Strictly inspect magic numbers/byte signatures before dispatching to Cloudinary
        const fileType = await verifyMagicBytes(localFilePath);

        // Enforce safe resource_type based on verified magic bytes (prevent executable contexts)
        const resourceType = fileType.mime === 'application/pdf' ? 'auto' : 'image';

        // Upload file to Cloudinary securely
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType,
            folder: "ims_uploads" // Keep uploads organized
        });
        
        // Remove locally saved temporary file as it is successfully uploaded
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return response;
    } catch (error) {
        // If upload or verification fails, remove the locally saved temporary file to prevent server disk space leak
        if (fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath);
            } catch (unlinkErr) {
                console.error("Failed to delete temp file:", unlinkErr);
            }
        }
        console.error("Cloudinary Upload Error:", error);
        if (error instanceof ApiError) {
            throw error;
        }
        return null;
    }
}

module.exports = { uploadOnCloudinary };


