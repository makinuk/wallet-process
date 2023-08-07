import {NextRequest, NextResponse} from "next/server";
import {DbConnection} from "@/config/MongoDbConf";
import User, { IUser } from "@/models/UserModel";
import jwt from "jsonwebtoken";

DbConnection()

export async function POST(request:NextRequest) {

    try {
        const resp = NextResponse.json({message:"Successfully Logged Out"});
        resp.cookies.delete("token")
        return resp;
    }
    catch (e:any) {
        return NextResponse.json({
            message:e.message,
        },{status:403})
    }

}
