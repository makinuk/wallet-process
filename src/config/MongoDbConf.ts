import mongoose from "mongoose";

export async function DbConnection() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on("connected",() => {
            console.log("Mongodb connected.")
        })

        connection.on("error",(err) => {
            console.log("MongoDb connection error!. Please make sure MongoDb is running. " + err)
            process.exit();
        });
    }
    catch (e:any) {
        console.log("Something goes wrong!")
        console.log(e)
    }
}
