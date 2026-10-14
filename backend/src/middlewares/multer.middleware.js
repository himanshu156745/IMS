const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure temp directory exists outside public folder to prevent serving uploaded files
const tempDir = path.join(__dirname, '../../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Multer DiskStorage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        // Prevent filename collisions and path traversal attacks
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const { fromBuffer } = require('file-type');
const ApiError = require('../utils/ApiError');

// Preliminary MIME and extension filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
    }
};

// Configured multer instance with strict size limits (5MB)
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter
});

/**
 * Validates real magic numbers / byte signatures of an uploaded file.
 * Allowed types: JPEG (image/jpeg), PNG (image/png), and PDF (application/pdf).
 * Rejects SVG, HTML, scripts, or executables masquerading with spoofed headers.
 */
const verifyMagicBytes = async (filePath) => {
    if (!filePath || !fs.existsSync(filePath)) {
        throw new ApiError(400, "File not found for security verification.");
    }

    let buffer;
    try {
        buffer = fs.readFileSync(filePath);
    } catch (readErr) {
        if (fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch (e) {}
        }
        throw new ApiError(400, "Unable to read file payload for inspection.");
    }

    let fileType;
    try {
        fileType = await fromBuffer(buffer);
    } catch (err) {
        fileType = null;
    }

    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!fileType || !allowed.includes(fileType.mime)) {
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (unlinkErr) {
                console.error("Failed to delete unverified file:", unlinkErr);
            }
        }
        throw new ApiError(400, "Malicious or invalid file payload detected via magic-byte inspection.");
    }

    return fileType;
};

/**
 * Express middleware to verify magic bytes of all uploaded files in req.
 * If any file fails verification, all files in req are cleaned up to prevent disk leaks.
 */
const validateFileMagicBytes = async (req, res, next) => {
    try {
        const filesToVerify = [];
        if (req.file && req.file.path) {
            filesToVerify.push(req.file.path);
        }
        if (req.files) {
            if (Array.isArray(req.files)) {
                req.files.forEach(f => f && f.path && filesToVerify.push(f.path));
            } else if (typeof req.files === 'object') {
                Object.values(req.files).forEach(fileArray => {
                    if (Array.isArray(fileArray)) {
                        fileArray.forEach(f => f && f.path && filesToVerify.push(f.path));
                    }
                });
            }
        }

        for (const filePath of filesToVerify) {
            await verifyMagicBytes(filePath);
        }
        next();
    } catch (error) {
        // Cleanup all files in req on failure
        const cleanupFiles = (files) => {
            if (!files) return;
            if (Array.isArray(files)) {
                files.forEach(f => {
                    if (f && f.path && fs.existsSync(f.path)) {
                        try { fs.unlinkSync(f.path); } catch (e) {}
                    }
                });
            } else if (typeof files === 'object') {
                Object.values(files).forEach(fArr => cleanupFiles(fArr));
            }
        };
        cleanupFiles(req.files);
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            try { fs.unlinkSync(req.file.path); } catch (e) {}
        }
        next(error);
    }
};

module.exports = { 
    upload, 
    verifyMagicBytes, 
    validateFileMagicBytes 
};

