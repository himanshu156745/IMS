const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload file to Cloudinary securely
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detects image, video, raw(pdf)
            folder: "ims_uploads" // Keep uploads organized
        });
        
        // Remove locally saved temporary file as it is successfully uploaded
        fs.unlinkSync(localFilePath);
        
        return response;
    } catch (error) {
        // If upload fails, remove the locally saved temporary file to prevent server disk space leak
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
}

module.exports = { uploadOnCloudinary };
