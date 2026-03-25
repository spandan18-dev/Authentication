import mongoose from 'mongoose';


const sessionSchema = new mongoose.Schema({
    user :{
        type: mongoose.Types.ObjectId,
        ref :"users",
        required: true
    },
    refreshTokenhash : {
        typr : String,
        required : true
    }
})