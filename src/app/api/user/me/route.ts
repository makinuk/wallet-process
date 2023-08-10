import { DbConnection } from "@/config/MongoDbConf";
import { TokenData, Utiliy } from "@/helpers/Utility";
import User, { IUser } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

DbConnection() 
export async function GET(request: NextRequest) {
       
    try {
        const token:TokenData = Utiliy.tokenDecode(request)

        const user = await User.findOne({address:token.address})

        if (user != null) {
            return NextResponse.json({user})
        }
    }
    catch(e:any) {
        return NextResponse.json({errorMessage:e.message});
    }
    
}

export async function PUT(request:NextRequest) {
    
    try {

        const tokenData:TokenData = Utiliy.tokenDecode(request);

        const reqData:IUser = await request.json() as IUser;

        const updateFields:Record<string,any> = {}

        if (reqData.name) {
            updateFields.name = reqData.name
        }

        if (reqData.isWorldIdVerified) {
            updateFields.isWorldIdVerified = reqData.isWorldIdVerified
        }

        if (Object.keys.length > 0) {
            const upUser = await User.findOneAndUpdate({address:tokenData.address},updateFields,{new:true})

            return NextResponse.json(upUser)
        }
        else {
            throw new Error("No update fields")
        }
        
    } catch (error:any) {
        return NextResponse.json({message:error.message})
    }

}