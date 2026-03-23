import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URL){
    throw new Error ("No MONGO_URL ")
}

const config = {
    dburl : process.env.MONGO_URL,
    port : process.env.PORT   
}

export default config