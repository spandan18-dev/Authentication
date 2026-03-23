import mongoose from 'mongoose';
import {dburl} from '../config/config.js';

const connectdb = async ()=>{
    try {
        await mongoose.connect(dburl);
        console.log("Db connected...")
    } catch (error) {
        console.error(error);
        console.log("Failed to connect db");
        process.exit(1);
    }
}

export default connectdb