import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('manchonDB is connected')
    } catch (error) {
        console.log(error);
    }
};