import mongoose from "mongoose";

export async function createDatabaseConnection() {
    

    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connect', () => {
            console.log('Connected to MongoDB');
        });
        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit();
        });
        

        
    } catch (error) {
        console.log("Error Occurred During Database Connection:", error);
    }



}
