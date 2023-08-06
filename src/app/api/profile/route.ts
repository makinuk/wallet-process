import {NextRequest, NextResponse} from "next/server";
import clientPromise from "@/app/lib/mongodb";
import {Db, MongoClient, WithId} from "mongodb";


export async function GET(request:NextRequest) {

    const address = request.nextUrl.searchParams.get("address");

    const client : MongoClient = await clientPromise;
    const user = await client.db()
        .collection("users")
        .findOne({address:address});

    return NextResponse.json(user);

}
