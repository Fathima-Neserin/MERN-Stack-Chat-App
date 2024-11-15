const mongoose = require("mongoose");

const connectToMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.error("Error connecting in MongoDB", error.message)
    }
} 

module.exports = connectToMongoDB;