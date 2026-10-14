const fs = require('fs');
const ApiError = require('../utils/ApiError');

const cleanupUploadedFiles = (req) => {
    try {
        if (!req) return;
        const fileList = [];
        if (req.file) fileList.push(req.file);
        if (req.files) {
            if (Array.isArray(req.files)) fileList.push(...req.files);
            else if (typeof req.files === 'object') {
                Object.values(req.files).forEach((val) => {
                    if (Array.isArray(val)) fileList.push(...val);
                    else if (val && typeof val === 'object') fileList.push(val);
                });
            }
        }
        fileList.forEach((f) => {
            if (f && f.path) {
                try {
                    if (fs.existsSync(f.path)) fs.unlinkSync(f.path);
                } catch (e) {}
            }
        });
    } catch (e) {}
};

const errorHandler = (err, req, res, next) => {
    cleanupUploadedFiles(req);
    let error = { ...err };
    error.message = err.message;

    // Only log unexpected internal errors (500s) to console
    const statusCode = error.statusCode || err.statusCode || (err.code === 'EBADCSRFTOKEN' ? 403 : 500);

    if (statusCode >= 500) {
        console.error(`[Server Error ${statusCode}]`, err);
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ApiError(404, message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ApiError(400, message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ApiError(400, message);
    }

    // Handle Multer errors
    if (err.name === 'MulterError') {
        const message = `File upload error: ${err.message}`;
        error = new ApiError(400, message);
    }

    // CSRF Error
    if (err.code === 'EBADCSRFTOKEN') {
        error = new ApiError(403, 'Invalid CSRF token');
    }
    
    // Do not leak internal error messages for 500s unless in development
    const responseMessage = statusCode === 500 && process.env.NODE_ENV !== 'development' 
        ? 'Internal Server Error' 
        : (error.message || err.message || 'Server Error');
    
    res.status(statusCode).json({
        success: false,
        message: responseMessage,
        errors: error.errors || [],
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = { errorHandler };
