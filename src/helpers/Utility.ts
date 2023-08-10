import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { Token } from "typescript";


export interface TokenData {
    address:string
}

export class Utiliy {


    static tokenEncode(tokenData: TokenData): string {
        return jwt.sign(tokenData,process.env.JWT_TOKEN!,{ expiresIn: "1h" });
    }

    static tokenDecode(request: NextRequest): TokenData {
        const token = request.cookies.get("token")?.value || ''

        const decodedToken:TokenData = jwt.verify(token, process.env.JWT_TOKEN!) as TokenData

        return {
            address: decodedToken.address
        }
    }

}