import mongoose, {Schema,Document} from "mongoose";
import { string } from "zod";

export interface SummarisedText extends Document {
    _id : string;
    content : string;
    generatedAt : Date
}

const SummarisedTextSchema:Schema<SummarisedText> = new Schema({
    content:{
        type : String,
        required : true
    },
    generatedAt:{
        type:Date,
        required : true,
        default : Date.now
    }
})

export interface User extends Document {
    username : string,
    email : string;
    password : string,
    summarisedText : SummarisedText[];
}

const User:Schema<User> = new Schema({
    username:{
        type : String,
        required : [true, "Username is Required"],
        trim : true,
        unique : true,
    },
    email:{
        type : String,
        required : [true , "Email is required"],
        unique : true,
        match : [/.+\@.+\..+/, 'please use a valid e-mail address']
    },
    password:{
        type : String,
        required : [true , "Password is Required"]
    },
    summarisedText:[]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", User)
export default UserModel;