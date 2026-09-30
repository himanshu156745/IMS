const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    process.exit(1);
}

if (!process.env.CSRF_SECRET || process.env.CSRF_SECRET.length < 32) {
    console.error("FATAL ERROR: CSRF_SECRET must be set and ≥32 chars.");
    process.exit(1);
}

const app = require('./app');
const db = require('./config/db');

const weakSecrets = ['password', 'secret', 'changeme', '123456', 'qwerty', 'admin', 'test'];

if (process.env.JWT_SECRET.length < 32) {
    console.error("FATAL ERROR: JWT_SECRET must be at least 32 characters long.");
    process.exit(1);
}

if (weakSecrets.some(weak => process.env.JWT_SECRET.toLowerCase().includes(weak))) {
    console.error("FATAL ERROR: JWT_SECRET contains weak or predictable keywords.");
    process.exit(1);
}

const PORT = process.env.PORT || 3001;      

db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Server start failed due to DB issue:", error.message);
});