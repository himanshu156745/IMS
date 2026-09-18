// Server.js 
const path = require('path');
require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 2222;

 app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });