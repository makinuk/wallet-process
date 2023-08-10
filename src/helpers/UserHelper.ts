import { NextRequest } from "next/server";
import User, { IUser } from "@/models/UserModel";
import { request } from "http";



class UserHelper {

    loadCurrentUser(request: NextRequest): IUser|null {
        
        try {
            const token = request.cookies.get("token")?.value || '';


            return null;   
        } catch (error:any) {
            return null
        }
    }


}