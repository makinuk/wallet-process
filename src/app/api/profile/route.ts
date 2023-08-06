import {NextRequest, NextResponse} from "next/server";
import { DbConnection } from "@/config/MongoDbConf";
import User from "@/models/UserModel";

DbConnection();

export async function GET(request:NextRequest) {

    const address = request.nextUrl.searchParams.get("address");

    const user = await User.findOne({address:address})
    
    return NextResponse.json(user);

}
