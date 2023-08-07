import {NextRequest, NextResponse} from "next/server";
import { DbConnection } from "@/config/MongoDbConf";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken"

DbConnection();

export async function GET(request:NextRequest) {

    const address = request.nextUrl.searchParams.get("address");

    const user = await User.findOne({address:address})
    

    const resp = NextResponse.json(user);

    const token = await jwt.sign({ address: user.address }, process.env.JWT_TOKEN!, { expiresIn: "1h" })
    console.log(token,"TOKEN")

    console.log("MMX")
    resp.cookies.set("token",token,{httpOnly:true})
    return resp;

}
