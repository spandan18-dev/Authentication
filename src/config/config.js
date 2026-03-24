import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URL){
    throw new Error ("No MONGO_URL ")
}

if(!process.env.JWT_KEY){
    throw new Error ("No Jwt Key")
}

const config = {
    dburl : process.env.MONGO_URL,
    port : process.env.PORT,
    jwtkey:process.env.JWT_KEY,
    saltRound : 10
}

export default config