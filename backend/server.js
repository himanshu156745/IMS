const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectToDb = require('./src/config/db');
const app = require('./src/app');
const logger = require('./src/config/logger');

const PORT = process.env.PORT || 3001;
if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    process.exit(1);
}

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
