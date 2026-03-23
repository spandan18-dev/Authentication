import Users from '../models/user.model.js'

async function register(req,res) {
    const {username,email,password} = req.body;

    const isAlredyUser = await Users.findOne({
        $or:[
            {username : username},
            {email : email}
        ]
    });

    if (isAlredyUser){
        res.status(400).json({
            message : "Username or email alredy exist",
            siccess : false
        })
    }

}