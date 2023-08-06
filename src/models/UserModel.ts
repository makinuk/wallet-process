import * as mongoose from "mongoose";

export interface IUser {
    name?: string;
    address: string;
    lastLogin?: Date;
    isWorldIdVerified?:Boolean;
  }

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:[true,"Please provide a name"],
        unique: false,
        trim:true
    },
    address: {
        type:String,
        required: [true,"Please Perovide a address"],
        unique: true,
    },
    lastLogin:{
        type:Date,
        required:false,
        default:Date.now
    },
    isWorldIdVerified: {
        type:Boolean,
        default:false
    }
})

const User = mongoose.models.users<IUser> || mongoose.model<IUser>("users",userSchema);

export default User;
