const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        const error = new Error('MONGODB_URI is not defined. Set it in backend/.env.');
        console.error(error.message);
        throw error;
    }

    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        logger.error('MongoDB connection failed. Check MONGODB_URI and make sure MongoDB is running.');
        throw error;
    }
};

module.exports = connectDB;
