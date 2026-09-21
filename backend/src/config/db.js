const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connectToDb = async () => {
    try {
        await mongoose.connect(config.MONGO_UR);
        logger.info('mongoDb is connected');
    } catch (error) {
        logger.error(error.message)
    }
};

module.exports = connectToDb;
