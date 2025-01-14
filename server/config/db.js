const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected successfully");
    }catch(error){
        console.log("connection error");
    }
}

module.exports = connectDB;