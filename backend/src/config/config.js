const dotenv = require("dotenv")
dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not define in the environment variable")
}

module.exports = {
    MONGO_URI : process.env.MONGO_URI
}