import usermodel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import jsonwebtoken from 'jsonwebtoken';

export async  function regester (req,res){
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

        const accesstoken = await jsonwebtoken.sign({
            id:user._id,
            email:user.email
            },config.jwtkey,
            {
                expiresIn :"15m"
            }
        );
        const refrestoken = await jsonwebtoken.sign({
            id:user._id,
            email:user.email
            },config.jwtkey,
            {
                expiresIn :"7d"
            }
        );

        res.cookie("RefershToken",refrestoken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message : "User Regestered sucesfully",
            user : {
                username : user.username,
                email : user.email
            },
            r : accesstoken
        })


    }catch(error){
        console.error(error);
        res.status(500).json({
            message : "Internal Server error , Try again Leter",
        })
    }
};

export async function refreshToken (req,res) {
    const refreshToken = req.cookies?.RefershToken;

    if(!refreshToken){
        return res.status(404).json({
            message : "Token not fount"
        })
    }

    const decoded = await jsonwebtoken.verify(refreshToken,config.jwtkey);

    const accesstoken = await jsonwebtoken.sign({
            id:decoded._id,
            email:decoded.email
            },config.jwtkey,
            {
                expiresIn :"15m"
            }
    );

    const newRefreshToken = await jsonwebtoken.sign({
        id:decoded._id,
        email : decoded.email
    },config.jwtkey,{
        expiresIn :"7d"
    })

    res.cookie("RefershToken",newRefreshToken,{
        httpOnly:true,
        secure:true,
        sameSite :"strict",
        maxAge : 7 * 24 * 60 * 60 *1000
    });

    res.status(201).json({
        message : "Access token generated sucesfully...",
        accessToken : accesstoken
    })
    
}
