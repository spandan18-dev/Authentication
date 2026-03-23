import mongoose from 'mongoose';
import config from '../config/config.js';

async function connectdb() {
    try {
        await mongoose.connect(config.dburl);
        console.log("Db connected...")
    } catch (error) {
        console.error(error);
        console.log("Failed to connect db");
        process.exit(1);
    }
}
   


export default connectdb;