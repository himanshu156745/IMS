const connectToDb = require('./src/config/db');
const app = require('./src/app');
const logger = require('./src/config/logger');
require('dotenv').config();


const PORT = process.env.PORT || 2222;

const startServer = async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            logger.info(`server is running on port ${PORT}`);
            logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        logger.error("server is not connected", error.message)
        process.exit(1)
    }
}

startServer();
