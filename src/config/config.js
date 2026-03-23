import dotenv from 'dotenv';
dotenv.config();

const config = {
    dburl : process.env.MONGO_URL,
    port : process.env.PORT   
}

export default config