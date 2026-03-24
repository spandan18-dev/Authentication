import usermodel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import jsonwebtoken from 'jsonwebtoken';

async  function regester (req,res){
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message : "All Fields are required"
            })
        };

        const isAlredyUser = await usermodel.findOne({
            $or:[{email},{username}]
        })

        if(isAlredyUser){
            return res.status(400).json({
                message : "Username or Email alredy exist, Try login"
            })
        };

        const salt = config.saltRound;
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await usermodel.create({
            username,
            email,
            password : hashPassword
        });

        const token = await jsonwebtoken.sign({
            id:user._id,
            email:user.email
            },config.jwtkey,
            {
                expiresIn :"1d"
            }
        );

        res.status(201).json({
            message : "User Regestered sucesfully",
            user : {
                username : user.username,
                email : user.email
            },
            Token : token
        })


    }catch(error){
        console.error(error);
        res.status(500).json({
            message : "Internal Server error , Try again Leter",
        })
    }
}


export {
    regester
}