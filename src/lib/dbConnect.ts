import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connection : ConnectionObject = {}

export default async function databaseConnect(): Promise<void> {
    if (connection.isConnected) { // checking the database connection to prevent the chocking//
        console.log("Database is already established");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        //trying to connect to a database by providing database, either we're providing the empty string to fetch the error.
        connection.isConnected = db.connections[0].readyState

        console.log("Database Connection has been Established");

        console.log(db);
        console.log(db.connections);
        
    } catch (error) {
        console.log("Database Connection has been lost", error);
        
        process.exit(1);
    }
}