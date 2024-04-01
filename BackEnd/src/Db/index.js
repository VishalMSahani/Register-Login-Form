import mongoose from 'mongoose';

const connectDB= async() =>{

    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://VishalMSahani:vishal120@backend-db.04xxidi.mongodb.net/saurabhbackend");
        console.log(`\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to the database", error);
        process.exit(1);
    }
}

export  default connectDB;