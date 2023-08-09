import {NextRequest, NextResponse} from "next/server";
import {DbConnection} from "@/config/MongoDbConf";
import User, { IUser } from "@/models/UserModel";
import jwt from "jsonwebtoken";

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

        const resp = NextResponse.json(newUser);

        const token = jwt.sign({ address: newUser.address }, process.env.JWT_TOKEN!, { expiresIn: "1h" })
        resp.cookies.set("token",token,{httpOnly:true})
        return resp;
    }
    catch (e:any) {
        console.log(e.message)
        return NextResponse.json({
            message:e.message,
        },{status:403})
    }

}
