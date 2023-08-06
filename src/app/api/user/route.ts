import {NextRequest, NextResponse} from "next/server";
import {DbConnection} from "@/config/MongoDbConf";
import User, { IUser } from "@/models/UserModel";

DbConnection()

export async function POST(request:NextRequest) {

    try {
        const reqBody = await request.json()
        const {address} = reqBody;

        const filter = {"address":address}
        const update: IUser = {
            address: address,
            lastLogin: new Date()
        }

        const newUser = await User.findOneAndUpdate(filter,update,{
            new: true,
            upsert: true 
        })

        return NextResponse.json({
            newUser
        })
    }
    catch (e:any) {
        return NextResponse.json({
            message:e.message,
        },{status:403})
    }

}
