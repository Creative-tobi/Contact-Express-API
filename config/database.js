const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_DB_URL = process.env.compass;

const connectedDB = async() => {
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log(`Mongodb connected ${MONGO_DB_URL}`);
        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}

module.exports = connectedDB;