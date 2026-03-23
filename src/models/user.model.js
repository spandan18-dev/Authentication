import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username :{
        typr : String,
        required : [true,"All fields are required"],
        unique : [true,"username must be unique"]
    },
    email :{
        typr : String,
        required : [true,"All fields are required"],
        unique : [true,"username must be unique"]
    },
    password :{
        type : String,
        required : [true ,"All fiels are required"]
    }

});

const usermodel = mongoose.model("User",userSchema);

export default usermodel;