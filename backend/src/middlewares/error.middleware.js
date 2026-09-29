const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(err);

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

    const statusCode = error.statusCode || 500;
    
    // Do not leak internal error messages for 500s unless in development
    const responseMessage = statusCode === 500 && process.env.NODE_ENV !== 'development' 
        ? 'Internal Server Error' 
        : (error.message || 'Server Error');
    
    res.status(statusCode).json({
        success: false,
        message: responseMessage,
        errors: error.errors || [],
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = { errorHandler };
