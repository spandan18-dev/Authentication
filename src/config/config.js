import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT
const dburl = process.env.MONGO_URL

export  {
    port,
    dburl
}